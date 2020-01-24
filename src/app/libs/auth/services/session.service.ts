import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { get } from 'lodash';

@Injectable()
export class SessionService {

  constructor(
    private authService: AuthenticationService,
  ) { }

  get currentUser(): any {
    return this.authService.auth.currentUser;
  }

  get isSignedIn(): boolean {
    return !!this.currentUser;
  }
  
  get uid(): string {
    return get(this.currentUser, 'uid');
  }
}