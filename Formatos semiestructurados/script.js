var estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];

mostrarEstudiantes();

document.getElementById("formulario").addEventListener("submit", function(event) {

    event.preventDefault();

    var cedula = document.getElementById("cedula").value.trim();
    var apellidos = document.getElementById("apellidos").value.trim();
    var nombres = document.getElementById("nombres").value.trim();
    var direccion = document.getElementById("direccion").value.trim();
    var telefono = document.getElementById("telefono").value.trim();
    var correo = document.getElementById("correo").value.trim();
    var facultad = document.getElementById("facultad").value;
    var nivel = document.getElementById("nivel").value;
    var paralelo = document.getElementById("paralelo").value;


    var validarCedula = /^[0-9]{10}$/;
    var validarNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s'-]+$/;
    var validarTelefono = /^09[0-9]{8}$/;
    var validarCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!validarNombre.test(apellidos)) {
        alert("Ingrese apellidos válidos");
    }
    else if (!validarNombre.test(nombres)) {
        alert("Ingrese nombres válidos");
    }
    else if (direccion.length < 5) {
        alert("Ingrese una dirección válida");
    }
    else if (!validarTelefono.test(telefono)) {
        alert("El teléfono debe comenzar con 09");
    }
    else if (!validarCorreo.test(correo)) {
        alert("Ingrese un correo electrónico válido");
    }
    else if (facultad == "" || nivel == "" || paralelo == "") {
        alert("Seleccione la facultad, nivel y paralelo");
    }
    else if (estudiantes.some(function(estudiante) {
        return estudiante.cedula == cedula;
    })) {
        alert("Esta cédula ya está registrada.");
    }
    else {


        var estudiante = {
            cedula: cedula,
            apellidos: apellidos,
            nombres: nombres,
            direccion: direccion,
            telefono: telefono,
            correo: correo,
            facultad: facultad,
            nivel: nivel,
            paralelo: paralelo
        };

        estudiantes.push(estudiante);

        localStorage.setItem("estudiantes", JSON.stringify(estudiantes));

        alert("Estudiante registrado correctamente.");

        document.getElementById("formulario").reset();

        mostrarEstudiantes();
    }

});

function mostrarEstudiantes() {

    var lista = document.getElementById("listaEstudiantes");

    lista.innerHTML = "";

    for (var i = 0; i < estudiantes.length; i++) {

        lista.innerHTML += `
            <tr>
                <td>${escapar(estudiantes[i].cedula)}</td>
                <td>${escapar(estudiantes[i].apellidos)}</td>
                <td>${escapar(estudiantes[i].nombres)}</td>
                <td>${escapar(estudiantes[i].telefono)}</td>
                <td>${escapar(estudiantes[i].correo)}</td>
                <td>${escapar(estudiantes[i].facultad)}</td>
                <td>${escapar(estudiantes[i].nivel)}</td>
                <td>${escapar(estudiantes[i].paralelo)}</td>
                <td>
                    <button class="eliminar" onclick="eliminarEstudiante(${i})">
                        Eliminar
                    </button>
                </td>
            </tr>
        `;
    }

    document.getElementById("total").innerHTML =
        "Total de estudiantes: " + estudiantes.length;
}


function eliminarEstudiante(indice) {

    if (confirm("¿Desea eliminar este estudiante?")) {

        estudiantes.splice(indice, 1);

        localStorage.setItem("estudiantes", JSON.stringify(estudiantes));

        mostrarEstudiantes();

        alert("Estudiante eliminado correctamente.");
    }
}


function escapar(texto) {

    return String(texto).replace(/[&<>"']/g, function(caracter) {
        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }[caracter];
    });

}
