import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { AuthGuard } from "./libs/auth/guards/auth.guard";

import { WelcomeComponent } from "./components/welcome/welcome.component";
import { AuthSignupComponent } from "./modules/auth/components/signup/signup.component";
import { AuthSigninComponent } from "./modules/auth/components/signin/signin.component";
import { AuthSignoutComponent } from "./modules/auth/components/signout/signout.component";

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(
      [
        // eager loaded modules
        { path: "signin", component: AuthSigninComponent },
        { path: "signup", component: AuthSignupComponent },
        { path: "signout", component: AuthSignoutComponent },

        // unauthenticated routes
        {
          path: "welcome",
          component: WelcomeComponent,
        },

        // authenticated routes
        {
          path: "",
          canActivate: [AuthGuard],
          children: [
            {
              path: "books",
              loadChildren: "./modules/books/books.module#BooksModule",
            },
            {
              path: "dashboard",
              loadChildren: "./modules/dashboard/dashboard.module#DashboardModule",
            },

            // root route
            {
              path: "",
              pathMatch: "full",
              redirectTo: "/dashboard",
            },
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
  providers: []
})
export class AppRoutingModule {}
