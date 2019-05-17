import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Constantes } from '../util/constantes';
import { RespuestaServicio } from '../service/respuestaservicio'; 
import { UsuarioService } from '../service/usuarioservice';
import { Usuario } from '../model/usuario';

@Component({
    selector: 'crear-usuario',
    templateUrl: './crearusuario.component.html'
})
export class CrearUsuarioComponent implements OnInit {

    mensajeError : string;
    titulo : string;

    username : string;
    password: string;
    nombre : string;
    apellido : string;

    constructor(private router : Router,
                private usuarioService : UsuarioService) {

    }

    ngOnInit() {
        this.titulo = 'Crear usuario';
    }

    crearUsuario() : void {

        if(!this.username || !this.password || !this.nombre || !this.apellido) {
            this.mensajeError = 'Todos los campos son obligatorios';
            return;
        }

        let usuario : Usuario = new Usuario();
        usuario.username = this.username;
        usuario.password = this.password;
        usuario.nombre = this.nombre;
        usuario.apellido = this.apellido;

        this.usuarioService.crearUsuario( usuario ).subscribe(
            response => {
                let respuesta : RespuestaServicio = response.value ? response.value as RespuestaServicio
                                                                   : response as RespuestaServicio;

                if(respuesta && respuesta.procesoExitoso) {
                    this.router.navigate(['/login']);
                    alert('Usuario creado correctamente. Ya puede acceder al sistema');
                } else if(respuesta && respuesta.errores) {
                    this.mensajeError = respuesta.getMensaje();
                } else {
                    this.mensajeError = "No se puede crear el titular en este momento. Intente más tarde";
                }

            }
        );
    }

    cancelar() : void {
        this.router.navigate(['/login']);
    }

}