import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router,
        private authAPI: AuthService,) {}

    canActivate() {
        // if (localStorage.getItem('isLoggedin')) {
        //     return true;
        // }
        if (this.authAPI.checkToken()) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}
