const pantalla = document.querySelector(".number");
const botones = document.querySelectorAll(".btn");
const historialDiv = document.getElementById("pantallatwo");
const historialLinea = document.getElementById('historial-linea');  // El elemento de la línea
const historialContainer = document.getElementById("historial");  // El historial del nuevo div
const clearHistorialBtn = document.getElementById("clear-historial");

let operacionActual = '';  // Guardará la operación en curso

// Cargar historial al cargar la página
document.addEventListener("DOMContentLoaded", cargarHistorial);

botones.forEach(boton => {
    boton.addEventListener("click", () => {
        const botonApretado = boton.textContent;

        if (boton.id === "c") {
            pantalla.textContent = "0";  // Solo limpia la pantalla, no el historial
            operacionActual = '';  // Reiniciar la operación en curso
            return;
        }

        if (boton.id === "borrar") {
            if (pantalla.textContent.length === 1 || pantalla.textContent === "Error!") {
                pantalla.textContent = "0";
            } else {
                pantalla.textContent = pantalla.textContent.slice(0, -1);
            }
            return;
        }

        if (boton.id === "igual") {
            // Verificar que la operación actual no esté vacía o incompleta
            if (operacionActual === '' || isNaN(operacionActual[operacionActual.length - 1])) {
                return;  // No hacer nada si no hay una operación válida
            }

            try {
                let resultado = eval(operacionActual);  // Calcular el resultado
                let operacionCompleta = `${operacionActual} = ${resultado}`;  // Guardar el resultado anterior
                pantalla.textContent = "0";  // Reiniciar la pantalla para la siguiente operación
                operacionActual = '';  // Limpiar la operación actual

                agregarAlHistorial(operacionCompleta);  // Agregar al historial
                cargarHistorial();  // Recargar el historial
            } catch {
                pantalla.textContent = "Error!";
            }
            return;
        }

        // Actualizar la operación actual
        if (pantalla.textContent === "0" || pantalla.textContent === "Error!") {
            pantalla.textContent = botonApretado;
        } else {
            pantalla.textContent += botonApretado;
        }

        operacionActual = pantalla.textContent;  // Guardar la operación actual en progreso
    });
});

// Función para agregar el cálculo al historial y guardarlo en localStorage
function agregarAlHistorial(operacion) {
    let historial = localStorage.getItem('historial') || '[]';
    historial = JSON.parse(historial);  // Convertir de cadena a arreglo
    historial.push(operacion);  // Agregar la nueva operación al historial
    localStorage.setItem('historial', JSON.stringify(historial));  // Guardar en localStorage
}

// Función para cargar el historial guardado en localStorage
function cargarHistorial() {
    let historial = localStorage.getItem('historial') || '[]';
    historial = JSON.parse(historial);  // Convertir de cadena a arreglo

    historialContainer.innerHTML = '';  // Limpiar el historial del div derecho
    historial.forEach(operacion => {
        let parrafo = document.createElement("p");
        parrafo.textContent = operacion;
        historialContainer.appendChild(parrafo);  // Mostrar el historial en el div derecho
    });
}

// Función para limpiar el historial (separada de la función del botón "C")
clearHistorialBtn.addEventListener("click", () => {
    localStorage.removeItem('historial');  // Eliminar historial de localStorage
    cargarHistorial();  // Recargar el historial vacío
});
