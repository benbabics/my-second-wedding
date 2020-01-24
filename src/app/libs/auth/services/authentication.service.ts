import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { auth } from 'firebase/app';
import { NgxSpinnerService } from "ngx-spinner";

@Injectable()
export class AuthenticationService {

  get auth(): any {
    return this.afAuth.auth;
  }

  constructor(
    private afAuth: AngularFireAuth,
    private spinner: NgxSpinnerService,
  ) { }

  onAuthStateChanged(callback: (user: any) => any): void {
    this.auth.onAuthStateChanged(user => callback(user));
  }

  signUp(email: string, password: string): Promise<any> {
    return this.makeRequest(
      this.auth.createUserWithEmailAndPassword(email, password)
    );
  }

  signIn(email: string, password: string): Promise<any> {
    return this.makeRequest(
      this.auth.signInWithEmailAndPassword(email, password)
    );
  }

  signOut(): Promise<any> {
    return this.auth.signOut();
  }

  private makeRequest(request: any): Promise<any> {
    this.spinner.show();
    return request.finally(() => this.spinner.hide());
  }
}