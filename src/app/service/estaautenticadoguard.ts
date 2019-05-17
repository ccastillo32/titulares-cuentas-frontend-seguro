import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';

@Injectable()
export class EstaAutenticadoGuard implements CanActivate {

    constructor(private router : Router) {

    }

    canActivate() {
        let token = sessionStorage.getItem('token');
        if(!token) {
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }

}