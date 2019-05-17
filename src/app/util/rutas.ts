import { ListadoComponent } from '../listado/listado.component';
import { CrearTitularComponent } from '../creartitular/creartitular.component';
import { CrearUsuarioComponent } from '../crearusuario/crearusuario.component';
import { LoginComponent } from '../login/login.component';
import { EstaAutenticadoGuard } from '../service/estaautenticadoguard';

export class Rutas {
    
    static RUTAS_APLICACION = [
        {path: '', redirectTo: '/listado', pathMatch: 'full'},
        {path: 'listado', component: ListadoComponent, canActivate: [EstaAutenticadoGuard]},
        {path: 'crearTitular', component: CrearTitularComponent, canActivate: [EstaAutenticadoGuard]},
        {path: 'crearTitular/:cuit', component: CrearTitularComponent, canActivate: [EstaAutenticadoGuard]},
        {path: 'crearUsuario', component: CrearUsuarioComponent},
        {path: 'login', component: LoginComponent}
    ];

}