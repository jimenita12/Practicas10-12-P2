export default class Auto {
    constructor(placas, propietario, horaEntrada) {
        this.placas = placas;
        this.propietario = propietario;
        this.horaEntrada = horaEntrada;
    }

    calcularCosto() {
        const horaSalida = new Date();
        const tiempoEstacionado = (horaSalida - this.horaEntrada) / 1000; // en segundos
        const costo = tiempoEstacionado * 2; // $2 por segundo
        return costo;
    }
}
