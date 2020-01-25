import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../libs/auth/services/session.service';

@Component({
  selector: 'app-default-page',
  templateUrl: './default-page.component.html',
  styleUrls: ['./default-page.component.css']
})
export class DefaultPageComponent implements OnInit {

  get isSignedIn(): boolean {
    return this.session.isSignedIn;
  }

  constructor(
    protected router: Router,
    private session: SessionService,
  ) { }

  ngOnInit() {
    if (this.isSignedIn) {
      this.router.navigate(['/dashboard']);
    }
  }
}