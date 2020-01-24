// Angular
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// modules
import { AppRoutingModule } from './app.routing.module';
import { AuthLibModule } from './libs/auth/auth.module';
import { StoreLibModule } from './libs/store/store.module';
import { AuthModule } from './modules/auth/auth.module';

// modules (3rd party)
import { NgxSpinnerModule } from 'ngx-spinner';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';

// Providers
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { AuthStateFactory } from './libs/auth/factories/auth.factory';
import { AuthenticationService } from './libs/auth/services/authentication.service';

// Declarations
import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { HeaderComponent } from './components/header/header.component';

const FIREBASE_CONFIG = {
  apiKey:            "AIzaSyB9y2KA0DaeyWwGiKPC6CAmoZbVAy6ugj8",
  authDomain:        "angular-authentication-45181.firebaseapp.com",
  databaseURL:       "https://angular-authentication-45181.firebaseio.com",
  projectId:         "angular-authentication-45181",
  storageBucket:     "angular-authentication-45181.appspot.com",
  messagingSenderId: "965858806414",
  appId:             "1:965858806414:web:24ad3a33967126216c57df",
  measurementId:     "G-DEH82Z0GR8",
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    FormsModule,
    NgxSpinnerModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    AppRoutingModule,
    AuthLibModule,
    StoreLibModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: AuthStateFactory,
      deps: [AuthenticationService],
      multi: true,
    },
  ],
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
