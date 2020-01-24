import { Component, OnInit } from '@angular/core';
import { AuthBase } from '../auth-base';
import { AuthenticationService } from '../../../../libs/auth/services/authentication.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class AuthSigninComponent extends AuthBase {

  constructor(private authService: AuthenticationService) {
    super();
  }

  makeRequest(email: string, password: string): Promise<any> {
    return this.authService.signIn(email, password);
  }
}