import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError} from 'rxjs/operators';

import { Constantes } from '../util/constantes';

@Injectable()
export class LoginService {

    constructor( private http : HttpClient ) {

    }

    login(username : string, password: string) : Observable<any> {
        let urlEndpoint = Constantes.ENDPOINT_AUTENTICACION;
        let credenciales = btoa(Constantes.CLIENT_ID + ':' + Constantes.CLIENT_SECRET);
        let httpHeaders = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + credenciales
        });

        let params = new URLSearchParams();
        params.set('grant_type', 'password');
        params.set('username', username);
        params.set('password', password);

        return this.http.post<any>(urlEndpoint, params.toString(), { headers: httpHeaders });

    }

}