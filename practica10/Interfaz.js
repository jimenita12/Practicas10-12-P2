export function abrirModalAgregarCliente() 
{
    const modalAgregarCliente = document.getElementById('modal-agregar-cliente');
    modalAgregarCliente.showModal();
}

export function cerrarModalAgregarCliente() 
{
    const modalAgregarCliente = document.getElementById('modal-agregar-cliente');
    modalAgregarCliente.close();
}

export function enviarCliente(colaBancaria, entradaNombreCliente, seleccionTipoMovimiento) 
{
    if (colaBancaria.colaLlena()) 
    {
        alert("La cola está llena. No se pueden agregar más clientes.");
        return;
    }

    const turno = colaBancaria.cola.length + 1;
    const nombre = entradaNombreCliente.value;
    const tipo = seleccionTipoMovimiento.value;
    const horaLlegada = new Date();
    colaBancaria.insertarCliente(turno, nombre, tipo, horaLlegada);
    actualizarTablaCola(colaBancaria);
    cerrarModalAgregarCliente();

    entradaNombreCliente.value = '';
    seleccionTipoMovimiento.value = 'Depósito';

    const informacionCliente = `Número de Turno: ${turno}, Nombre del Cliente: ${nombre}, Tipo de Movimiento: ${tipo}, Hora de Llegada: ${horaLlegada.toLocaleTimeString()}`;
    document.getElementById('informacion-cliente').textContent = informacionCliente;
    document.getElementById('dialogo').style.display = 'block';
}

export function cerrarDialogo() 
{
    document.getElementById('dialogo').style.display = 'none';
}

export function atenderCliente(colaBancaria) 
{
    const clienteAtendido = colaBancaria.atenderCliente();
    if (clienteAtendido) 
    {
        actualizarTablaCola(colaBancaria);
    }
}

export function actualizarTablaCola(colaBancaria) 
{
    const cuerpoTabla = document.querySelector('tbody');
    cuerpoTabla.innerHTML = '';

    colaBancaria.cola.forEach(cliente => 
    {
        const fila = cuerpoTabla.insertRow();
        const celda1 = fila.insertCell(0);
        const celda2 = fila.insertCell(1);
        const celda3 = fila.insertCell(2);
        const celda4 = fila.insertCell(3);
        celda1.innerHTML = cliente.turno;
        celda2.innerHTML = cliente.nombre;
        celda3.innerHTML = cliente.tipo;
        celda4.innerHTML = cliente.horaLlegada.toLocaleTimeString();
    });

    document.getElementById('tabla-clientes').style.display = 'table';
}
