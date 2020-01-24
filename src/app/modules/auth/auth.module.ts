import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthSignupComponent } from './components/signup/signup.component';
import { AuthSigninComponent } from './components/signin/signin.component';
import { AuthSignoutComponent } from './components/signout/signout.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    AuthSignupComponent,
    AuthSigninComponent,
    AuthSignoutComponent,
  ]
})
export class AuthModule { }