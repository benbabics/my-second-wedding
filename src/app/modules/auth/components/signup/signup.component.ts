import { Component } from '@angular/core';
import { AuthBase } from '../auth-base';
import { AuthenticationService } from '../../../../libs/auth/services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class AuthSignupComponent extends AuthBase {

  constructor(private authService: AuthenticationService) {
    super();
  }

  makeRequest(email: string, password: string): Promise<any> {
    return this.authService.signUp(email, password);
  }
}