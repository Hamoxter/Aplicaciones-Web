function validacion() {


var cedula = document.getElementById("cedula").value;
var nombre = document.getElementById("nombre").value;
var direccion = document.getElementById("direccion").value;
var telefono = document.getElementById("telefono").value;
var correo = document.getElementById("correo").value;

if (cedula == "") {
    alert("La cédula no puede estar vacía");
    return;
}

if (cedula.length != 10) {
    alert("La cédula debe tener 10 dígitos");
    return;
}

if (nombre == "") {
    alert("El nombre no puede estar vacío");
    return;
}


if (direccion == "") {
    alert("La dirección no puede quedar vacía");
    return;
}

if (telefono == "") {
    alert("El número de teléfono no puede quedar vacío");
    return;
}

if (telefono.length != 10) {
    alert("El número de teléfono debe tener 10 dígitos");
    return;
}

if (correo == "") {
    alert("El correo no puede quedar vacío");
    return;
}

if (!correo.includes("@")) {
    alert("Ingrese un correo válido");
    return;
}

alert("Cliente registrado correctamente");


}
