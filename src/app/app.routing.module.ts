import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';

import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

import { canActivate } from '@angular/fire/auth-guard';

import { AuthGuard } from "./libs/auth/guards/auth.guard";

import { WelcomeComponent } from "./components/welcome/welcome.component";
import { DefaultPageComponent } from "./components/default-page/default-page.component";

import { AuthSignupComponent } from "./modules/auth/components/signup/signup.component";
import { AuthSigninComponent } from "./modules/auth/components/signin/signin.component";
import { AuthSignoutComponent } from "./modules/auth/components/signout/signout.component";

@NgModule({
  imports: [
    AngularFireAuthGuardModule,
    RouterModule.forRoot(
      [
        // public
        { path: "signin",  component: AuthSigninComponent },
        { path: "signup",  component: AuthSignupComponent },
        { path: "signout", component: AuthSignoutComponent },
        { path: "welcome", component: WelcomeComponent },

        // protected
        {
          path: "",
          canActivate:      [ AuthGuard ],
          canActivateChild: [ AuthGuard ],
          children: [
            {
              path: "books",
              loadChildren: "./modules/books/books.module#BooksModule",
            },
            {
              path: "dashboard",
              loadChildren: "./modules/dashboard/dashboard.module#DashboardModule",
            },
            {
              path: "",
              component: DefaultPageComponent,
            }
          ]
        },

        // catch-all
        { path: "**", redirectTo: "" }
      ],
      {
        enableTracing: false
      }
    )
  ],
  exports: [RouterModule],
  declarations: [],
  providers: []
})
export class AppRoutingModule {}
