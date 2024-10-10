const NumberGeneratorModule = (function () {
  let numerosGenerados = new Set();
  let coloresGenerados = new Set(); // Set para almacenar los colores generados
  let numerosArray = []; // Arreglo para almacenar los números

  // funcion principal
  function generarNumeroAleatorio() {
    // validacion de numeros generados
    if (numerosGenerados.size >= 99) {
      alert("Ya se han generado todos los números posibles.");
      return;
    }
    // generar numeros
    let numero;
    do {
      numero = Math.floor(Math.random() * 99) + 1;
    } while (numerosGenerados.has(numero));

    numerosGenerados.add(numero);
    numerosArray.push(numero); // Agrega el número al arreglo
    crearCajaNumero(numero);
  }

  // Función para generar un color aleatorio sin repetir
  function generarColorAleatorio() {
    let color;
    do {
      // Generar valores R, G, B entre 127 y 255 (para tonos pastel)
      const r = Math.floor(Math.random() * 128) + 127;
      const g = Math.floor(Math.random() * 128) + 127;
      const b = Math.floor(Math.random() * 128) + 127;

      // Convertir a formato hexadecimal
      color = `#${((1 << 24) + (r << 16) + (g << 8) + b)
        .toString(16)
        .slice(1)}`;
    } while (coloresGenerados.has(color)); // Evitar colores repetidos

    coloresGenerados.add(color); // Agregar el color al conjunto de colores generados
    return color;
  }

  function crearCajaNumero(numero) {
    const numberContainer = document.getElementById("number-container");

    // Convertir el número en string con formato "01", "02", etc.
    const numeroFormateado = numero.toString().padStart(2, "0");

    const box = document.createElement("div");
    box.classList.add("box");
    box.textContent = numeroFormateado;

    // Asignar un color de fondo pastel aleatorio no repetido
    box.style.backgroundColor = generarColorAleatorio();

    numberContainer.appendChild(box);
  }

  function ordenarNumeros(ascendente = true) {
    const numberContainer = document.getElementById("number-container");
    numberContainer.innerHTML = ""; // Limpia el contenedor
    const sortedArray = ascendente
      ? numerosArray.slice().sort((a, b) => a - b)
      : numerosArray.slice().sort((a, b) => b - a);

    sortedArray.forEach((numero) => crearCajaNumero(numero)); // Crea cajas para los números ordenados
  }

  return {
    generarNumeroAleatorio: generarNumeroAleatorio,
    ordenarNumeros: ordenarNumeros,
  };
})();

document.getElementById("btn-generar").addEventListener("click", function () {
  NumberGeneratorModule.generarNumeroAleatorio();
});

document
  .getElementById("btn-ordenar-asc")
  .addEventListener("click", function () {
    NumberGeneratorModule.ordenarNumeros(true);
  });

document
  .getElementById("btn-ordenar-desc")
  .addEventListener("click", function () {
    NumberGeneratorModule.ordenarNumeros(false);
  });
