import { TitularFisico } from '../model/titularfisico';
import { TitularJuridico } from '../model/titularjuridico';

export class Validador {

    public static validarTitularFisico(titular : TitularFisico) : string {

        let cuit : string = titular.cuit;
        let dni : string = titular.dni;
        let nombres : string = titular.nombre;
        let apellidos : string = titular.apellido;

        if(!cuit) {
            return 'El campo CUIT es obligatorio';
        } else if(!this.cuitFisicoTieneFormatoValido( cuit )) {
            return "El CUIT debe tener el siguiente formato: (20|23|24|27)-XXXXXXXX-X"
        }

        if(!dni) {
            return 'El campo DNI es obligatorio';
        } else if(!this.esNumero( dni )) {
            return 'El campo dni debe ser numerico';
        } else if(!this.dniEstaContenidoEnElCUIT( dni, cuit)) {
            return 'La segunda parte del CUIT no coincide con el DNI';
        }

        if(!nombres) {
            return 'El nombre del titular es obligatorio';
        } else if(!this.soloLetrasYEspacios(nombres)) {
            return 'El campo nombre solo acepta letras  y espacios';
        }

        if(!apellidos) {
            return 'El apellido del titular es obligatorio';
        } else if(!this.soloLetrasYEspacios(apellidos)) {
            return 'El campo apellidos solo acepta letras  y espacios';
        }

    }

    public static validarTitularJuridico(titular : TitularJuridico) : string {

        let cuit : string = titular.cuit;
        let razonSocial : string = titular.razonSocial;
        let anioFundacion : number = titular.anioFundacion;

        if(!cuit) {
            return 'El campo CUIT es obligatorio';
        } else if(!this.cuitJuridicoTieneFormatoValido( cuit )) {
            return "El CUIT debe tener el siguiente formato: (30|33|34)-XXXXXXXX-X"
        }

        if(!razonSocial) {
            return 'El campo razón social es obligatorio';
        } else if(!this.soloLetrasYEspacios(razonSocial)) {
            return 'El campo razón social acepta letras y espacios';
        }

        if(!anioFundacion) {
            return 'El campo año de fundación es obligatorio';
        } else if(!this.esNumero( anioFundacion )) {
            return 'El campo año de fundación debe ser numérico';
        } 

    }

    public static cuitFisicoTieneFormatoValido(cuit) : boolean {
        let regex = /\b(20|23|24|27)(\D)?[0-9]{8}(\D)?[0-9]/g
        return new RegExp(regex).test(cuit);
    }

    public static cuitJuridicoTieneFormatoValido(cuit) : boolean {
        let regex = /\b(30|33|34)(\D)?[0-9]{8}(\D)?[0-9]/g
        return new RegExp(regex).test(cuit);
    }

    public static esNumero( valor ) : boolean {
        let regex = /^\d+$/;
        return new RegExp(regex).test(valor);
    }

    public static dniEstaContenidoEnElCUIT(dni : string, cuit: string) {
        let array = cuit.split("-");
        return array[1] == dni;
    }

    public static soloLetrasYEspacios(valor : string) {
        let regex = /^[A-Za-zñÑ\s]+$/;
        return new RegExp(regex).test(valor);
    }

    public static eliminarGuionesCuit(cuit : string) {
        return cuit.replace(/-/g, '')
    }

}