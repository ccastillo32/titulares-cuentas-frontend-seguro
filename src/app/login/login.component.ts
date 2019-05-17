import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/loginservice';
import { Router } from '@angular/router';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    mensajeError : string;
    username : string;
    password : string;

    constructor(private loginService : LoginService,
                private router : Router) {

    }

    ngOnInit() {

    }

    acceder() : void {
        this.loginService.login(this.username, this.password).subscribe(
            response => { 
                console.log(response);
                if(response.access_token) {
                    sessionStorage.setItem('token', response.access_token);
                    this.router.navigate(['/listado']);
                }
            },
            error => {
                this.mensajeError = 'Usuario o contrasena incorrectos';
            }
        )
    }

    crearNuevo() {
        this.router.navigate(['/crearUsuario']);
    }

}