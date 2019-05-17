import { Component } from '@angular/core';

@Component({
    template: 'cerrar-sesion',
    templateUrl: './cerrarsesion.component.html'
})
export class CerrarSesionComponent {
    
    cerrarSesion() : void {
        console.log('cerrar');
    }

}