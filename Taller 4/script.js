document.getElementById("registroForm").addEventListener("submit", function(e) {

    e.preventDefault();

    // Limpiar errores anteriores
    document.querySelectorAll(".error").forEach(function(el) {
        el.innerText = "";
    });

    var esValido = true;


    // 1. Validar nombre

    var nombre = document.getElementById("nombre").value;

    var regexNombre = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ ]+$/;

    if (!regexNombre.test(nombre)) {

        document.getElementById("errorNombre").innerText =
            "El nombre solo debe contener letras.";

        esValido = false;
    }


    // 2. Validar correo

    var email = document.getElementById("email").value;

    var regexEmail =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!regexEmail.test(email)) {

        document.getElementById("errorEmail").innerText =
            "Ingrese un correo electrónico válido.";

        esValido = false;
    }


    // 3. Validar contraseña

    var pass = document.getElementById("password").value;

    var regexPass =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!regexPass.test(pass)) {

        document.getElementById("errorPass").innerText =
            "La contraseña debe tener 8 caracteres, una mayúscula y un número.";

        esValido = false;
    }


    // Comprobar si todo es correcto

    if (esValido) {

        alert("¡Formulario enviado con éxito!");

        this.reset();
    }

});