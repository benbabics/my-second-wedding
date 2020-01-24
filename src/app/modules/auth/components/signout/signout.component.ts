import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { AuthenticationService } from '../../../../libs/auth/services/authentication.service';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css']
})
export class AuthSignoutComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.spinner.show();

    this.authService.signOut()
      .then(() => this.router.navigateByUrl(''))
      .then(() => this.spinner.hide());
  }
}