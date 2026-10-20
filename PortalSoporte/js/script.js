document.addEventListener("DOMContentLoaded", () => {

    // Seleccion de elementos del DOM
    const textareaDescripcion = document.getElementById("descripcion");
    const contadorSpan = document.getElementById("contador");
    const formulario = document.getElementById("form-soporte");
    const mensajeExito = document.getElementById("mensaje-exito");

    // 1. Deteccion del evento 'input' para contar caracteres
    if (textareaDescripcion && contadorSpan) {
        textareaDescripcion.addEventListener("input", (e) => {
            const longitudActual = e.target.value.length;
            
            // Modificacion interactiva del DOM
            contadorSpan.textContent = longitudActual;

            // Alerta visual si se acerca al limite
            if (longitudActual >= 230) {
                contadorSpan.style.color = "#e53e3e";
                contadorSpan.style.fontWeight = "bold";
            } else {
                contadorSpan.style.color = "#718096";
                contadorSpan.style.fontWeight = "normal";
            }
        });
    }

    // 2. Validacion, Confirmacion y LocalStorage al enviar
    if (formulario) {
        formulario.addEventListener("submit", (e) => {
            e.preventDefault();

            limpiarErrores();

            const nombre = document.getElementById("nombre").value.trim();
            const correo = document.getElementById("correo").value.trim();
            const telefono = document.getElementById("telefono").value.trim();
            const descripcion = textareaDescripcion.value.trim();

            let esValido = true;

            // Validacion de Campo Nombre
            if (nombre === "") {
                mostrarError("error-nombre", "El nombre completo es obligatorio.");
                esValido = false;
            }

            // Validacion de Correo Electronico
            const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (correo === "") {
                mostrarError("error-correo", "El correo electronico es obligatorio.");
                esValido = false;
            } else if (!regexCorreo.test(correo)) {
                mostrarError("error-correo", "Por favor ingresa un formato de correo valido.");
                esValido = false;
            }

            // Validacion de Telefono
            if (telefono === "") {
                mostrarError("error-telefono", "El telefono de contacto es obligatorio.");
                esValido = false;
            }

            // Validacion de Descripcion
            if (descripcion === "") {
                mostrarError("error-descripcion", "La descripcion del problema es obligatoria.");
                esValido = false;
            }

            if (!esValido) return;

            // Construir el objeto de solicitud
            const ticketSoporte = {
                idTicket: "TICK-" + Math.floor(Math.random() * 90000 + 10000),
                nombreCliente: nombre,
                correoCliente: correo,
                telefonoCliente: telefono,
                problemaReportado: descripcion,
                fechaRegistro: new Date().toLocaleString()
            };

            // Guardar en LocalStorage
            localStorage.setItem("ticketSoporteDivaliTech", JSON.stringify(ticketSoporte));
            console.log("[LOCALSTORAGE] Registro guardado con exito:", ticketSoporte);

            // Mostrar mensaje de confirmacion en pantalla
            mensajeExito.innerHTML = `
                Solicitud registrada con exito.<br>
                <strong>Folio de atencion:</strong> ${ticketSoporte.idTicket}<br>
                Un tecnico de DivaliTech se pondra en contacto al correo <em>${correo}</em>.
            `;
            mensajeExito.classList.remove("oculto");

            formulario.reset();
            contadorSpan.textContent = "0";
        });
    }

    function mostrarError(idElemento, mensaje) {
        const elementoError = document.getElementById(idElemento);
        if (elementoError) {
            elementoError.textContent = mensaje;
        }
    }

    function limpiarErrores() {
        const errores = document.querySelectorAll(".mensaje-error");
        errores.forEach(err => err.textContent = "");
        if (mensajeExito) {
            mensajeExito.classList.add("oculto");
        }
    }
});