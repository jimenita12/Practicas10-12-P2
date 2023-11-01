import Auto from "./Auto.js";
import ColaCircular from "./ColaCircular.js";

const estacionamiento = new ColaCircular();

function mostrarModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "block";
}

function cerrarModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
}

function entradaAuto() {
    const placasInput = document.getElementById("placas");
    const propietarioInput = document.getElementById("propietario");

    const placas = placasInput.value;
    const propietario = propietarioInput.value;

    if (placas && propietario) {
        const auto = new Auto(placas, propietario, new Date());

        if (!estacionamiento.estaLlena()) {
            estacionamiento.encolar(auto);
            const output = document.getElementById("output");
            output.innerHTML = `<p>AUTO INGRESADO:<br><br> Placas: ${auto.placas}<br> Propietario: ${auto.propietario}<br> Hora de entrada: ${auto.horaEntrada.toLocaleString()}</p>`;
            cerrarModal();

            // Restablecer los campos de entrada
            placasInput.value = "";
            propietarioInput.value = "";
        } else {
            alert("El estacionamiento está lleno.");
        }
    } else {
        alert("Por favor, complete todos los campos.");
    }
}

function salidaAuto() {
    const auto = estacionamiento.desencolar();
    if (auto) {
        const costo = auto.calcularCosto();
        const output = document.getElementById("output");
        output.innerHTML = `<p>Auto SALIENDO:<br><br> Placas: ${auto.placas}<br> Propietario: ${auto.propietario}<br> Hora de entrada: ${auto.horaEntrada.toLocaleString()}<br> Hora de salida: ${new Date().toLocaleString()}<br> Costo: $${costo.toFixed(2)}</p>`;
    } else {
        alert("El estacionamiento está vacío.");
    }
}

// Asignar eventos a los botones después de que se cargue el DOM
document.addEventListener("DOMContentLoaded", function () {
    const mostrarModalButton = document.getElementById("mostrarModalBtn");
    const entradaButton = document.getElementById("entradaAutoBtn");
    const salidaButton = document.getElementById("salidaAutoBtn");

    mostrarModalButton.addEventListener("click", mostrarModal);
    entradaButton.addEventListener("click", entradaAuto);
    salidaButton.addEventListener("click", salidaAuto);
});
