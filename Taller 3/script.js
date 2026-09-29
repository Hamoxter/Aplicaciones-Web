
// Obtiene los datos ingresados en el html por su id
var num1 = document.getElementById("num1");
var num2 = document.getElementById("num2");


// Función de la calculadora
function calcular() {

    // Convierte los datos a valor numerico
    var num1 = Number(document.getElementById("num1").value);
    var num2 = Number(document.getElementById("num2").value);


    // Ciclo for
    for (i = 1; i < 6; i++) {


        // Suma
        if (i == 1) {

            // Variable donde se almacena el resultado.
            var resultado;
            resultado = num1 + num2;


            alert("El resultado es: " + resultado);
        }


        // Resta
        if (i == 2) {

            var resultado;

            resultado = num1 - num2;

            alert("El resultado es: " + resultado);
        }


        // Multiplicacion
        if (i == 3) {

            var resultado;

            resultado = num1 * num2;

            alert("El resultado es: " + resultado);
        }


        // División
        if (i == 4) {

            var resultado;

            // Comprueba que el segundo número no sea cero
            if (num2 != 0) {

                resultado = num1 / num2;

                // Muestra el resultado de la división.
                alert("El resultado es: " + resultado);

            } else {

                // Si el segundo número es cero, muestra un mensaje indicando que no se puede dividir
                alert("No es posible la división por cero");
            }
        }


        // Residuo
        if (i == 5) {
            var resultado;


            // Comprueba que el segundo número no sea cero.
            if (num2 != 0) {

                resultado = num1 % num2;

                alert("El resultado es: " + resultado);

            } else {

                // Si el segundo número es cero, muestra un mensaje de error
                alert("No es posible la división por cero");
            }
        }

    }

}
