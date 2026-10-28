/* Datos de prueba */

var muebles = [
    { codigo: "MOB-001", nombre: "Escritorio", estado: "Asignado", ubicacion: "Aula 101", responsable: "Jefferson Moreira" },
    { codigo: "MOB-002", nombre: "Silla operativa", estado: "En mantenimiento", ubicacion: "Laboratorio 1", responsable: "Vanessa Molina" },
    { codigo: "MOB-003", nombre: "Archivador", estado: "Disponible", ubicacion: "Aula 102", responsable: "Adolfo Meneses" },
    { codigo: "MOB-004", nombre: "Mesa simple", estado: "Asignado", ubicacion: "Aula 101", responsable: "Ruber Naranjo" },
    { codigo: "MOB-005", nombre: "Computador", estado: "Disponible", ubicacion: "Bodega", responsable: "Andrés Pico" },
    { codigo: "MOB-006", nombre: "Silla", estado: "Disponible", ubicacion: "Biblioteca", responsable: "Vanessa Molina" },
    { codigo: "MOB-007", nombre: "Estantería", estado: "Asignado", ubicacion: "Biblioteca", responsable: "Ruber Naranjo" },
    { codigo: "MOB-008", nombre: "Máquina expendedora", estado: "En mantenimiento", ubicacion: "FCVT - Bloque 16", responsable: "Andrés Pico" }
];

var ubicaciones = [
    { nombre: "Aula 101", bloque: "FCVT - Bloque 16" },
    { nombre: "Aula 102", bloque: "FCVT - Bloque 15" },
    { nombre: "Laboratorio 1", bloque: "FCVT - Bloque 15" },
    { nombre: "Biblioteca", bloque: "FCSD - Bloque 04" },
    { nombre: "Bodega", bloque: "Administración" },
    { nombre: "Secretaría", bloque: "FIIA Bloque 08" }
];

var responsables = [
    { nombre: "Jefferson Moreira", cargo: "Encargado de bodega", facultad: "FCVT" },
    { nombre: "Vanessa Molina", cargo: "Técnica de mantenimiento", facultad: "FCVT" },
    { nombre: "Adolfo Meneses", cargo: "Responsable de aula", facultad: "FCVT" },
    { nombre: "Ruber Naranjo", cargo: "Responsable del aula", facultad: "FCVT" },
    { nombre: "Andrés Pico", cargo: "Administrador", facultad: "Administración" }
];

var movimientos = [
    { codigo: "MOB-001", nombre: "Escritorio", origen: "Bodega", destino: "Aula 101", motivo: "Asignación", fecha: "01/10/2026" },
    { codigo: "MOB-002", nombre: "Silla operativa", origen: "Aula 102", destino: "Laboratorio 1", motivo: "Mantenimiento", fecha: "02/10/2026" },
    { codigo: "MOB-003", nombre: "Archivador", origen: "Bodega", destino: "Aula 102", motivo: "Traslado", fecha: "03/10/2026" }
];

var historialEstados = [
    { codigo: "EST-001", mueble: "MOB-002", anterior: "Disponible", nuevo: "En mantenimiento", responsable: "Vanessa Molina", fecha: "02/10/2026" },
    { codigo: "EST-002", mueble: "MOB-008", anterior: "Disponible", nuevo: "En mantenimiento", responsable: "Andrés Pico", fecha: "06/10/2026" }
];

var reportes = [
    { codigo: "RPT-001", tipo: "Inventario general", ubicacion: "Todas", fecha: "01/10/2026" },
    { codigo: "RPT-002", tipo: "Movimientos de mobiliario", ubicacion: "Todas", fecha: "02/10/2026" },
    { codigo: "RPT-003", tipo: "Mobiliario por ubicación", ubicacion: "Aula 101", fecha: "03/10/2026" }
];


/* Funciones */

function buscarElemento(id) {
    return document.getElementById(id);
}

function mostrarAviso(texto) {
    alert(texto);
}

function mostrarFormulario(id) {
    buscarElemento(id).classList.remove("oculto");
}

function ocultarFormulario(id) {
    buscarElemento(id).classList.add("oculto");
}


/* Inicio de sesión */

buscarElemento("formularioInicioSesion").addEventListener("submit", function(evento) {
    evento.preventDefault();

    var correo = buscarElemento("correo").value.trim();
    var contrasena = buscarElemento("contrasena").value;

    if (correo === "" || contrasena === "") {
        mostrarAviso("Complete todos los campos.");
    } else {
        buscarElemento("inicioSesion").classList.add("oculto");
        buscarElemento("sistema").classList.remove("oculto");

        buscarElemento("usuarioActual").textContent = "Administrador";
        cambiarPantalla("inicio");
    }
});

buscarElemento("salir").addEventListener("click", function() {
    buscarElemento("sistema").classList.add("oculto");
    buscarElemento("inicioSesion").classList.remove("oculto");
    buscarElemento("contrasena").value = "";
});


/* Navegación de interfaces */

function cambiarPantalla(nombre) {
    var pantallas = document.querySelectorAll(".pantalla");
    var botones = document.querySelectorAll(".enlace-menu[data-pantalla]");

    pantallas.forEach(function(pantalla) {
        pantalla.classList.remove("activo");
    });

    botones.forEach(function(boton) {
        boton.classList.remove("activo");
    });

    buscarElemento("pantalla-" + nombre).classList.add("activo");

    document.querySelector('[data-pantalla="' + nombre + '"]').classList.add("activo");

    var titulos = {
        inicio: "Panel principal",
        inventario: "Inventario",
        ubicaciones: "Ubicaciones",
        responsables: "Responsables",
        movimientos: "Movimientos",
        estados: "Estados",
        reportes: "Reportes"
    };

    buscarElemento("tituloPantalla").textContent = titulos[nombre];
}

document.querySelectorAll(".enlace-menu[data-pantalla]").forEach(function(boton) {
    boton.addEventListener("click", function() {
        cambiarPantalla(boton.getAttribute("data-pantalla"));
    });
});

document.querySelectorAll("[data-ir]").forEach(function(boton) {
    boton.addEventListener("click", function() {
        cambiarPantalla(boton.getAttribute("data-ir"));
    });
});


/* Mostrar datos */

function mostrarInventario() {
    var contenido = "";

    muebles.forEach(function(mueble) {
        contenido += `
            <article class="tarjeta-mueble">
                <div class="imagen-mueble">▣</div>
                <div class="datos-mueble">
                    <h4>${mueble.nombre}</h4>
                    <p>Código: ${mueble.codigo}</p>
                    <p>Ubicación: ${mueble.ubicacion}</p>
                    <p>Responsable: ${mueble.responsable}</p>
                    <span class="etiqueta-estado">${mueble.estado}</span>
                </div>
            </article>`;
    });

    buscarElemento("tarjetasInventario").innerHTML = contenido;
}

function mostrarUbicaciones() {
    var contenido = "";

    ubicaciones.forEach(function(ubicacion) {
        contenido += `
            <article class="tarjeta-ubicacion">
                <div class="icono-ubicacion">⌖</div>
                <h4>${ubicacion.nombre}</h4>
                <p>${ubicacion.bloque}</p>
            </article>`;
    });

    buscarElemento("rejillaUbicaciones").innerHTML = contenido;
}

function mostrarResponsables() {
    var contenido = "";

    responsables.forEach(function(persona) {
        contenido += `
            <article class="tarjeta-responsable">
                <div class="avatar-responsable">♙</div>
                <h4>${persona.nombre}</h4>
                <p>Cargo: ${persona.cargo}</p>
                <p>Facultad: ${persona.facultad}</p>
            </article>`;
    });

    buscarElemento("tarjetasResponsables").innerHTML = contenido;
}

function mostrarMovimientos() {
    var contenido = "";
    var recientes = "";

    movimientos.forEach(function(movimiento, i) {
        contenido += `
            <tr>
                <td>${i + 1}</td>
                <td>${movimiento.codigo}</td>
                <td>${movimiento.nombre}</td>
                <td>${movimiento.origen}</td>
                <td>${movimiento.destino}</td>
                <td>${movimiento.motivo}</td>
                <td>${movimiento.responsable || "Sin responsable"}</td>
                <td>${movimiento.fecha}</td>
            </tr>`;
    });

    movimientos.slice(-4).reverse().forEach(function(movimiento) {
        recientes += `
            <tr>
                <td>${movimiento.codigo}</td>
                <td>${movimiento.nombre}</td>
                <td>${movimiento.destino}</td>
                <td>${movimiento.motivo}</td>
                <td>${movimiento.fecha}</td>
            </tr>`;
    });

    buscarElemento("tablaMovimientos").innerHTML = contenido;
    buscarElemento("movimientosRecientes").innerHTML = recientes;
}

function mostrarEstados() {
    var contenido = "";

    historialEstados.forEach(function(dato) {
        contenido += `
            <tr>
                <td>${dato.codigo}</td>
                <td>${dato.mueble}</td>
                <td>${dato.anterior}</td>
                <td>${dato.nuevo}</td>
                <td>${dato.motivo || "Sin especificar"}</td>
                <td>${dato.responsable}</td>
                <td>${dato.fecha}</td>
                <td>${dato.observaciones || "Sin observaciones"}</td>
            </tr>`;
    });

    buscarElemento("tablaHistorialEstados").innerHTML = contenido;
}

function mostrarReportes() {
    var contenido = "";

    reportes.forEach(function(reporte, i) {
        contenido += `
            <tr>
                <td>${i + 1}</td>
                <td>${reporte.codigo}</td>
                <td>${reporte.tipo}</td>
                <td>${reporte.ubicacion}</td>
                <td>${reporte.estado || "Todos"}</td>
                <td>${reporte.fecha}</td>
                <td>Administrador</td>
            </tr>`;
    });

    buscarElemento("tablaReportes").innerHTML = contenido;
}

/* Contadores */

function actualizarContadores() {
    var disponibles = 0;
    var asignados = 0;
    var mantenimiento = 0;
    var baja = 0;

    muebles.forEach(function(mueble) {
        if (mueble.estado === "Disponible") {
            disponibles++;
        } else if (mueble.estado === "Asignado") {
            asignados++;
        } else if (mueble.estado === "En mantenimiento") {
            mantenimiento++;
        } else if (mueble.estado === "De baja") {
            baja++;
        }
    });

    buscarElemento("totalMuebles").textContent = muebles.length;
    buscarElemento("mueblesDisponibles").textContent = disponibles;
    buscarElemento("mueblesAsignados").textContent = asignados;
    buscarElemento("mueblesEnMantenimiento").textContent = mantenimiento;

    buscarElemento("conteoDisponiblesEstados").textContent = disponibles;
    buscarElemento("conteoAsignadosEstados").textContent = asignados;
    buscarElemento("conteoMantenimientoEstados").textContent = mantenimiento;
    buscarElemento("conteoBajaEstados").textContent = baja;

    buscarElemento("totalReporte").textContent = muebles.length;
    buscarElemento("disponiblesReporte").textContent = disponibles;
    buscarElemento("asignadosReporte").textContent = asignados;
    buscarElemento("mantenimientoReporte").textContent = mantenimiento;
}


/* Validar codigos */

function validarCodigo(codigo) {
    var existe = false;

    muebles.forEach(function(mueble) {
        if (mueble.codigo === codigo) {
            existe = true;
        }
    });

    if (existe) {
        mostrarAviso("Este código ya está registrado.");
        return false;
    }

    return true;
}


/* Sacar fecha */

buscarElemento("fechaDeHoy").textContent =
    new Date().toLocaleDateString("es-EC");


/* Mostrar interfaces */

mostrarInventario();
mostrarUbicaciones();
mostrarResponsables();
mostrarMovimientos();
mostrarEstados();
mostrarReportes();
actualizarContadores();



/* Mostrar y ocultar formularios */

buscarElemento("mostrarFormularioMueble").onclick = function() {
    mostrarFormulario("panelFormularioMueble");
};

buscarElemento("cancelarMueble").onclick = function() {
    ocultarFormulario("panelFormularioMueble");
};

buscarElemento("mostrarFormularioUbicacion").onclick = function() {
    mostrarFormulario("panelFormularioUbicacion");
};

buscarElemento("cancelarUbicacion").onclick = function() {
    ocultarFormulario("panelFormularioUbicacion");
};

buscarElemento("mostrarFormularioResponsable").onclick = function() {
    mostrarFormulario("panelFormularioResponsable");
};

buscarElemento("cancelarResponsable").onclick = function() {
    ocultarFormulario("panelFormularioResponsable");
};

buscarElemento("mostrarFormularioMovimiento").onclick = function() {
    llenarSelectores();
    mostrarFormulario("panelFormularioMovimiento");
};

buscarElemento("cancelarMovimiento").onclick = function() {
    ocultarFormulario("panelFormularioMovimiento");
};

buscarElemento("mostrarFormularioCambioEstado").onclick = function() {
    llenarSelectores();
    mostrarFormulario("panelFormularioEstado");
};

buscarElemento("cancelarCambioEstado").onclick = function() {
    ocultarFormulario("panelFormularioEstado");
};

buscarElemento("mostrarFormularioReporte").onclick = function() {
    llenarSelectores();
    mostrarFormulario("panelFormularioReporte");
};

buscarElemento("cancelarReporte").onclick = function() {
    ocultarFormulario("panelFormularioReporte");
};


/* Llenar formulariosS */

function llenarSelectores() {
    var listaUbicaciones = "";
    var listaResponsables = "";
    var listaMuebles = "";

    ubicaciones.forEach(function(ubicacion) {
        listaUbicaciones += `<option>${ubicacion.nombre}</option>`;
    });

    responsables.forEach(function(persona) {
        listaResponsables += `<option>${persona.nombre}</option>`;
    });

    muebles.forEach(function(mueble) {
        listaMuebles += `<option value="${mueble.codigo}">${mueble.codigo} - ${mueble.nombre}</option>`;
    });

    buscarElemento("ubicacionMueble").innerHTML = listaUbicaciones;
    buscarElemento("facultadResponsable").innerHTML = listaUbicaciones;
    buscarElemento("destinoMovimiento").innerHTML = listaUbicaciones;
    buscarElemento("ubicacionReporte").innerHTML =
        '<option>Todas</option>' + listaUbicaciones;

    buscarElemento("responsableMueble").innerHTML =
        '<option value="">Sin responsable asignado</option>' + listaResponsables;

    buscarElemento("responsableMovimiento").innerHTML =
        '<option value="">Seleccione un responsable</option>' + listaResponsables;

    buscarElemento("responsableEstado").innerHTML =
        '<option value="">Seleccione un responsable</option>' + listaResponsables;

    buscarElemento("muebleMovimiento").innerHTML = listaMuebles;
    buscarElemento("muebleEstado").innerHTML = listaMuebles;

    actualizarOrigen();
    actualizarEstadoActual();
}


/* Registro de mobiliario */

buscarElemento("formularioMueble").addEventListener("submit", function(evento) {
    evento.preventDefault();

    var codigo = buscarElemento("codigoMueble").value.trim().toUpperCase();
    var nombre = buscarElemento("nombreMueble").value.trim();

    if (codigo === "" || nombre === "") {
        mostrarAviso("Complete los campos obligatorios.");
    } else if (!validarCodigo(codigo)) {
        return;
    } else {
        var nuevoMueble = {
            codigo: codigo,
            nombre: nombre,
            tipo: buscarElemento("tipoMueble").value,
            estado: buscarElemento("estadoMueble").value,
            ubicacion: buscarElemento("ubicacionMueble").value,
            responsable: buscarElemento("responsableMueble").value || "Sin responsable",
            descripcion: buscarElemento("descripcionMueble").value
        };

        muebles.push(nuevoMueble);

        mostrarInventario();
        actualizarContadores();
        llenarSelectores();

        buscarElemento("formularioMueble").reset();
        ocultarFormulario("panelFormularioMueble");
        mostrarAviso("Mobiliario registrado correctamente.");
    }
});


/* Registrar ubicaciones */

buscarElemento("formularioUbicacion").addEventListener("submit", function(evento) {
    evento.preventDefault();

    var nombre = buscarElemento("nombreUbicacion").value.trim();
    var bloque = buscarElemento("bloqueUbicacion").value.trim();
    var existe = false;

    ubicaciones.forEach(function(ubicacion) {
        if (ubicacion.nombre.toLowerCase() === nombre.toLowerCase()) {
            existe = true;
        }
    });

    if (nombre === "" || bloque === "") {
        mostrarAviso("Complete todos los campos.");
    } else if (existe) {
        mostrarAviso("Esta ubicación ya está registrada.");
    } else {
        ubicaciones.push({
            nombre: nombre,
            bloque: bloque
        });

        mostrarUbicaciones();
        llenarSelectores();
        buscarElemento("formularioUbicacion").reset();
        ocultarFormulario("panelFormularioUbicacion");
        mostrarAviso("Ubicación registrada correctamente.");
    }
});


/* Resgistrar responsables */

buscarElemento("formularioResponsable").addEventListener("submit", function(evento) {
    evento.preventDefault();

    var nombre = buscarElemento("nombreResponsable").value.trim();
    var cargo = buscarElemento("cargoResponsable").value.trim();
    var contacto = buscarElemento("contactoResponsable").value.trim();
    var facultad = buscarElemento("facultadResponsable").value;
    var existe = false;

    responsables.forEach(function(persona) {
        if (persona.nombre.toLowerCase() === nombre.toLowerCase()) {
            existe = true;
        }
    });

    if (nombre === "" || cargo === "" || contacto === "") {
        mostrarAviso("Complete todos los campos.");
    } else if (existe) {
        mostrarAviso("Este responsable ya está registrado.");
    } else {
        responsables.push({
            nombre: nombre,
            cargo: cargo,
            contacto: contacto,
            facultad: facultad
        });

        mostrarResponsables();
        llenarSelectores();
        buscarElemento("formularioResponsable").reset();
        ocultarFormulario("panelFormularioResponsable");
        mostrarAviso("Responsable registrado correctamente.");
    }
});


/* Registar movimientos */

function actualizarOrigen() {
    var codigo = buscarElemento("muebleMovimiento").value;
    var origen = "";

    muebles.forEach(function(mueble) {
        if (mueble.codigo === codigo) {
            origen = mueble.ubicacion;
        }
    });

    buscarElemento("origenMovimiento").value = origen;
}

buscarElemento("muebleMovimiento").addEventListener("change", actualizarOrigen);


buscarElemento("formularioMovimiento").addEventListener("submit", function(evento) {
    evento.preventDefault();

    var codigo = buscarElemento("muebleMovimiento").value;
    var destino = buscarElemento("destinoMovimiento").value;
    var responsable = buscarElemento("responsableMovimiento").value;
    var fecha = buscarElemento("fechaMovimiento").value;
    var origen = buscarElemento("origenMovimiento").value;
    var motivo = buscarElemento("motivoMovimiento").value;
    var nombre = "";
    var existe = false;

    muebles.forEach(function(mueble) {
        if (mueble.codigo === codigo) {
            nombre = mueble.nombre;

            if (mueble.ubicacion === destino) {
                existe = true;
            }
        }
    });

    if (codigo === "" || destino === "" || responsable === "" || fecha === "") {
        mostrarAviso("Complete los campos obligatorios.");
    } else if (existe) {
        mostrarAviso("El mueble ya se encuentra en esa ubicación.");
    } else {
        movimientos.push({
            codigo: codigo,
            nombre: nombre,
            origen: origen,
            destino: destino,
            motivo: motivo,
            responsable: responsable,
            fecha: fecha,
            detalle: buscarElemento("detalleMovimiento").value
        });

        muebles.forEach(function(mueble) {
            if (mueble.codigo === codigo) {
                mueble.ubicacion = destino;
                mueble.responsable = responsable;
            }
        });

        mostrarMovimientos();
        mostrarInventario();
        llenarSelectores();

        buscarElemento("formularioMovimiento").reset();
        ocultarFormulario("panelFormularioMovimiento");
        mostrarAviso("Movimiento registrado correctamente.");
    }
});


/* Cambio de estado */

function actualizarEstadoActual() {
    var codigo = buscarElemento("muebleEstado").value;
    var estado = "";

    muebles.forEach(function(mueble) {
        if (mueble.codigo === codigo) {
            estado = mueble.estado;
        }
    });

    buscarElemento("estadoActualMueble").value = estado;
}

buscarElemento("muebleEstado").addEventListener("change", actualizarEstadoActual);




buscarElemento("formularioEstado").addEventListener("submit", function(evento) {
    evento.preventDefault();

    var codigo = buscarElemento("muebleEstado").value;
    var nuevoEstado = buscarElemento("nuevoEstadoMueble").value;
    var responsable = buscarElemento("responsableEstado").value;
    var motivo = buscarElemento("motivoEstado").value;
    var fecha = buscarElemento("fechaCambioEstado").value;
    var observaciones = buscarElemento("observacionesEstado").value;
    var anterior = "";
    var nombre = "";

    muebles.forEach(function(mueble) {
        if (mueble.codigo === codigo) {
            anterior = mueble.estado;
            nombre = mueble.nombre;
        }
    });

    if (codigo === "" || responsable === "" || motivo === "" || fecha === "") {
        mostrarAviso("Complete los campos obligatorios.");
    } else if (anterior === nuevoEstado) {
        mostrarAviso("Seleccione un estado diferente al actual.");
    } else {
        historialEstados.push({
            codigo: "EST-" + String(historialEstados.length + 1).padStart(3, "0"),
            mueble: codigo + " - " + nombre,
            anterior: anterior,
            nuevo: nuevoEstado,
            responsable: responsable,
            motivo: motivo,
            fecha: fecha,
            observaciones: observaciones
        });

        muebles.forEach(function(mueble) {
            if (mueble.codigo === codigo) {
                mueble.estado = nuevoEstado;
            }
        });

        mostrarEstados();
        mostrarInventario();
        actualizarContadores();

        buscarElemento("formularioEstado").reset();
        llenarSelectores();
        ocultarFormulario("panelFormularioEstado");
        mostrarAviso("Estado actualizado correctamente.");
    }
});


/* Generar reporte */

buscarElemento("formularioReporte").addEventListener("submit", function(evento) {
    evento.preventDefault();

    var tipo = buscarElemento("tipoReporte").value;
    var ubicacion = buscarElemento("ubicacionReporte").value;
    var estado = buscarElemento("estadoReporte").value;
    var fecha = new Date().toLocaleDateString("es-EC");

    reportes.push({
        codigo: "RPT-" + String(reportes.length + 1).padStart(3, "0"),
        tipo: tipo,
        ubicacion: ubicacion,
        estado: estado,
        fecha: fecha
    });

    mostrarReportes();
    buscarElemento("formularioReporte").reset();
    ocultarFormulario("panelFormularioReporte");
    mostrarAviso("Reporte generado y agregado al historial.");
});



function colocarFechaActual() {
    var fecha = new Date();
    var anio = fecha.getFullYear();
    var mes = String(fecha.getMonth() + 1).padStart(2, "0");
    var dia = String(fecha.getDate()).padStart(2, "0");
    var fechaTexto = anio + "-" + mes + "-" + dia;

    buscarElemento("fechaMovimiento").value = fechaTexto;
    buscarElemento("fechaCambioEstado").value = fechaTexto;
}

llenarSelectores();
colocarFechaActual();


