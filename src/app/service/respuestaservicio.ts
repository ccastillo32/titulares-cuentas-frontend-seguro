/**
 * Respuesta que envian los services hacia los Components.
 */
export class RespuestaServicio {
    procesoExitoso : boolean;
    data : any;
    errores: string[];

    getMensaje() : string {
        return this.errores[0];
    }

}