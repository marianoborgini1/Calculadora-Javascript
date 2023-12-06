const pantalla = document.querySelector(".pantalla");
const botones = document.querySelectorAll(".btn");
const verHistorialBtn = document.getElementById("verHistorial");
const historialModal = document.getElementById("historialModal");
const historialLista = document.getElementById("historialLista");

document.addEventListener('DOMContentLoaded', function () {
    cargarHistorial();
});

function cargarHistorial() {
    const historialGuardado = JSON.parse(sessionStorage.getItem('historial')) || [];
    historialLista.innerHTML = historialGuardado.map(item => `<li>${item}</li>`).join('');
}

function abrirModal() {
    historialModal.style.display = "block";
    overlay.style.display = "block";
    historialModal.style.top = `${Math.max(0, (window.innerHeight - historialModal.offsetHeight) / 2)}px`;
    historialModal.style.left = `${Math.max(0, (window.innerWidth - historialModal.offsetWidth) / 2)}px`;
    document.body.style.overflow = "hidden";
}

function cerrarModal() {
    historialModal.style.display = "none";
    overlay.style.display = "none";
    document.body.style.overflow = "auto";
}

botones.forEach(boton => {
    boton.addEventListener("click", () => {
        const botonApretado = boton.textContent;

        if (boton.id === "borrartodo" || pantalla.textContent === "Error") {
            pantalla.textContent = "0";
            return;
        }

        if (boton.id === "borrar") {
            if (pantalla.textContent.length === 1 || pantalla.textContent === "Error") {
                pantalla.textContent = "0";
            } else {
                pantalla.textContent = pantalla.textContent.slice(0, -1);
            }
            return;
        }

        if (boton.id === "igual") {
            try {
                const expresion = pantalla.textContent;
                const resultado = eval(expresion);
                pantalla.textContent = resultado;

                const historialGuardado = JSON.parse(sessionStorage.getItem('historial')) || [];
                historialGuardado.push(`${expresion} = ${resultado}`);
                sessionStorage.setItem('historial', JSON.stringify(historialGuardado));

                cargarHistorial();
                historialModal.style.top = `${Math.max(0, (window.innerHeight - historialModal.offsetHeight) / 2)}px`;
                historialModal.style.left = `${Math.max(0, (window.innerWidth - historialModal.offsetWidth) / 2)}px`;
            } catch {
                pantalla.textContent = "Error";
            }
            return;
        }

        if (pantalla.textContent === "0") {
            pantalla.textContent = botonApretado;
        } else {
            pantalla.textContent += botonApretado;
        }
    });
});