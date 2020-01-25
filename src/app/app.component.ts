import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { SessionService } from './libs/auth/services/session.service';
import { AuthenticationService } from './libs/auth/services/authentication.service';
import { RequestUserData } from './request-user-data';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent extends RequestUserData implements OnInit {

  constructor(
    db: AngularFirestore,
    router: Router,
    session: SessionService,
    auth: AuthenticationService,
  ) {
    super(db, session);

    let isSignedIn = session.isSignedIn;

    auth.onAuthStateChanged(user => {
      if (!isSignedIn) router.navigateByUrl('');
      isSignedIn = !!user;
    });
  }

  ngOnInit() {
    // this.requestUserData();
  }
}
