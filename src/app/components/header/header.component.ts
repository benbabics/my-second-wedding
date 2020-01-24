import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../libs/auth/services/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  get isSignedIn(): boolean {
    return this.session.isSignedIn;
  }

  constructor(
    private session: SessionService,
    private router: Router,
  ) { }

  handleSignOut(): void {
    this.router.navigateByUrl('signout');
  }
}