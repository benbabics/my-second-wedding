import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { SessionService } from './libs/auth/services/session.service';
import { RequestUserData } from './request-user-data';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent extends RequestUserData implements OnInit {

  constructor(
    db: AngularFirestore,
    session: SessionService,
  ) {
    super(db, session);
  }

  ngOnInit() {
    // this.loadData();
  }
}
