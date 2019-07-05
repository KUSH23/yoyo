import { Component, OnInit } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';

import {AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-auth-logout',
  templateUrl: './auth-logout.component.html',
  styleUrls: ['./auth-logout.component.scss']
})
export class AuthLogoutComponent implements OnInit {

  constructor(
    private authAPI: AuthService,
    private cookieService: CookieService,
  ) { }

  ngOnInit() {
    this.cookieService.delete('jwttoken', '/')
    this.cookieService.delete('username')
    this.cookieService.delete('status')
    this.authAPI.performLogout("You have successfully logged out! Please login again.")
  }

}
