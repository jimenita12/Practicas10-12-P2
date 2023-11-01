export default class ColaBancaria 
{
    constructor(tamanoMaximo) 
    {
        this.cola = [];
        this.tamanoMaximo = tamanoMaximo;
    }

    insertarCliente(turno, nombre, tipo, horaLlegada) 
    {
        if (this.colaLlena()) 
        {
            alert("La cola está llena. No se pueden agregar más clientes.");
            return;
        }

        this.cola.push({ turno, nombre, tipo, horaLlegada });
    }

    atenderCliente() 
    {
        if (this.colaVacia()) 
        {
            alert("No hay clientes en la cola.");
            return null;
        }

        const clienteAtendido = this.cola.shift();
        const horaActual = new Date();
        const tiempoEspera = (horaActual - clienteAtendido.horaLlegada) / 1000;
        alert(`Cliente ${clienteAtendido.nombre} atendido. Tiempo de espera: ${tiempoEspera.toFixed(2)} segundos.`);
        return clienteAtendido;
    }

    colaVacia() 
    {
        return this.cola.length === 0;
    }

    colaLlena() 
    {
        return this.cola.length >= this.tamanoMaximo;
    }
}
