export default class ColaCircular {
    constructor() {
        this.capacidad = 10; // Cambia la capacidad según tus necesidades
        this.autos = new Array(this.capacidad);
        this.inicio = 0;
        this.fin = 0;
    }

    estaVacia() {
        return this.inicio === this.fin && this.autos[this.inicio] === undefined;
    }

    estaLlena() {
        return this.inicio === this.fin && this.autos[this.inicio] !== undefined;
    }

    encolar(auto) {
        if (!this.estaLlena()) {
            this.autos[this.fin] = auto;
            this.fin = (this.fin + 1) % this.capacidad;
        }
    }

    desencolar() {
        if (!this.estaVacia()) {
            const auto = this.autos[this.inicio];
            this.autos[this.inicio] = undefined;
            this.inicio = (this.inicio + 1) % this.capacidad;
            return auto;
        }
        return null;
    }
}