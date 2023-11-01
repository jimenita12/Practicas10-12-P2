
import ColaBancaria from './ColaBancaria.js';
import * as UI from './Interfaz.js';

const TAMANO_MAXIMO_COLA = 10;
const colaBancaria = new ColaBancaria(TAMANO_MAXIMO_COLA);

const botonAgregarCliente = document.getElementById('agregar-cliente-btn');
const modalAgregarCliente = document.getElementById('modal-agregar-cliente');
const entradaNombreCliente = document.getElementById('nombre-cliente');
const seleccionTipoMovimiento = document.getElementById('tipo-movimiento');

botonAgregarCliente.addEventListener('click', () => 
{
    modalAgregarCliente.showModal();
});

document.getElementById('cerrar-modal').addEventListener('click', () => 
{
    modalAgregarCliente.close();
});

document.getElementById('enviar-cliente').addEventListener('click', () => 
{
    if (colaBancaria.colaLlena()) {
        alert("La cola está llena. No se pueden agregar más clientes.");
        return;
    }

    const turno = colaBancaria.cola.length + 1;
    const nombre = entradaNombreCliente.value;
    const tipo = seleccionTipoMovimiento.value;
    const horaLlegada = new Date();
    colaBancaria.insertarCliente(turno, nombre, tipo, horaLlegada);
    UI.actualizarTablaCola(colaBancaria);
    modalAgregarCliente.close();
    entradaNombreCliente.value = '';
    seleccionTipoMovimiento.value = 'Depósito';

    const informacionCliente = `Número de Turno: ${turno}<br>Nombre del Cliente: ${nombre}<br>Tipo de Movimiento: ${tipo}<br>Hora de Llegada: ${horaLlegada.toLocaleTimeString()}`;
    document.getElementById('informacion-cliente').innerHTML = informacionCliente;      
    document.getElementById('dialogo').style.display = 'block';
});

document.getElementById('cerrar-dialogo').addEventListener('click', () => 
{
    document.getElementById('dialogo').style.display = 'none';
});

const botonAtenderCliente = document.getElementById('atender-cliente-btn');
botonAtenderCliente.addEventListener('click', () => {
    const clienteAtendido = colaBancaria.atenderCliente();
    if (clienteAtendido) {
        UI.actualizarTablaCola(colaBancaria);
    }
});

