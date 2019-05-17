import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError} from 'rxjs/operators';

import { Titular } from '../model/titular';
import { TitularFisico } from '../model/titularfisico';
import { TitularJuridico } from '../model/titularjuridico';
import { RespuestaServicio } from '../service/respuestaservicio';
import { Constantes } from '../util/constantes';

@Injectable()
export class TitularService {

    httpHeaders : HttpHeaders = new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + this.getToken()
    })

    constructor(private http : HttpClient) {

    }

    listarTitulares() : Observable<any> {
        let headers : any = { headers: this.httpHeaders };
        return this.http.get( Constantes.ENDPOINT_TITULARES , headers).pipe(
            map( response => this.respuestaExitosa(response) ),
            catchError( err => this.capturarExcepcion(err) )
        );
    }

    crearTitular(datosAGuardar : Titular) : Observable<any> {
        let url = (datosAGuardar.tipo == Constantes.FISICO) ? Constantes.ENDPOINT_TITULAR_FISICO
                                                            : Constantes.ENDPOINT_TITULAR_JURIDICO;
        let headers : any = { headers: this.httpHeaders };
        return this.http.post( url, datosAGuardar, headers ).pipe(
            map( response => this.respuestaExitosa(response) ),
            catchError(err => this.capturarExcepcion(err) )
        );
    }

    buscarTitular(cuit : string) : Observable<any> {
        let cuitSinGuiones = this.eliminarGuionesCuit(cuit);
        return this.http.get( Constantes.ENDPOINT_TITULARES + '/' + cuitSinGuiones ).pipe(
            map( response => this.respuestaExitosa(response) ),
            catchError( err => this.capturarExcepcion(err) )
        );
    }

    actualizarTitular(datosAGuardar : Titular) : Observable<any> {
        let url = (datosAGuardar.tipo == Constantes.FISICO) ? Constantes.ENDPOINT_TITULAR_FISICO
                                                            : Constantes.ENDPOINT_TITULAR_JURIDICO;
        let headers : any = { headers: this.httpHeaders };
        return this.http.put( url, datosAGuardar, headers ).pipe(
            map( response => this.respuestaExitosa(response) ),
            catchError(err => this.capturarExcepcion(err) )
        );
    }

    eliminarTitular(cuit : string) : Observable<any> {
        let cuitSinGuiones = this.eliminarGuionesCuit(cuit);
        let headers : any = { headers: this.httpHeaders };
        return this.http.delete( Constantes.ENDPOINT_TITULARES + '/' + cuitSinGuiones, headers ).pipe(
            map( response => this.respuestaExitosa(response) ),
            catchError(err => this.capturarExcepcion(err) )
        );
    }

    private getToken() : string {
        return sessionStorage.getItem('token');
    }

    private getHeaders() : any {
        let httpHeaders : HttpHeaders = new HttpHeaders({
            'Content-Type' : 'application/json'
        });
        let headers : any = { headers: this.httpHeaders };
        return headers;
    }

    private respuestaExitosa(data) : Observable<any> {
        console.log('respuesta exitosa ...');
        console.log(data);
        let respuesta : RespuestaServicio = new RespuestaServicio();
        respuesta.procesoExitoso = true;
        respuesta.data = data;
        respuesta.errores = null;
        return of(respuesta);
    }

    private capturarExcepcion(e : any) : Observable<any> {
        console.log('capturar excepcion ...');
        console.log(e);
        let respuesta : RespuestaServicio = new RespuestaServicio();
        let errores : string[] = [];

        if(e.status == 500) {
            errores.push(e.error.error);
        } else if(e.status == 422 && e.error.errores) {
            e.error.errores.forEach( value => errores.push(value) );
        } else if(e.status == 422 && e.error.error) {   
            errores.push( e.error.error);
        } else if(e.status == 0) {
            errores.push('No se puede procesar la solicitud en este momento. Intente más tarde');
        }

        respuesta.data = null;
        respuesta.procesoExitoso = false;
        respuesta.errores = errores;
        return of(respuesta);
    }

    private eliminarGuionesCuit(cuit : string) {
        return cuit.replace(/-/g, '');
    }

}