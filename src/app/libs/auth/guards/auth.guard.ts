import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SessionService } from '../services/session.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    private session: SessionService,
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    if (!this.session.isSignedIn) {
      switch(state.url) {
        case "/":
          return this.router.createUrlTree(['/welcome']);
      }
    }
    
    return true;
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    if (!this.session.isSignedIn) {
      switch(state.url) {
        default:
          return this.router.createUrlTree(['/signin']);
      }
    }
    
    return true;
  }
}
