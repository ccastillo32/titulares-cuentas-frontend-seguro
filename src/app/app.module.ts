import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ListadoComponent } from './listado/listado.component';
import { CrearTitularComponent } from './creartitular/creartitular.component';
import { CrearUsuarioComponent } from './crearusuario/crearusuario.component';
import { LoginComponent } from './login/login.component';
import { CerrarSesionComponent } from './cerrarsesion/cerrarsesion.component';

import { Rutas } from './util/rutas';
import { EstaAutenticadoGuard } from './service/estaautenticadoguard';

import { TitularService } from './service/titularservice';
import { UsuarioService } from './service/usuarioservice';
import { LoginService } from './service/loginservice';

@NgModule({
  declarations: [
    AppComponent, CrearTitularComponent, ListadoComponent, CrearUsuarioComponent, LoginComponent, CerrarSesionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot( Rutas.RUTAS_APLICACION )
  ],
  providers: [ TitularService, UsuarioService, LoginService, EstaAutenticadoGuard ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
