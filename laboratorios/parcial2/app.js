const NumberGeneratorModule = (function () {
  let numerosGenerados = new Set();
  let numerosArray = []; // Arreglo para almacenar los números

  function generarNumeroAleatorio() {
    if (numerosGenerados.size >= 99) {
      alert("Ya se han generado todos los números posibles.");
      return;
    }

    let numero;
    do {
      numero = Math.floor(Math.random() * 99) + 1;
    } while (numerosGenerados.has(numero));

    numerosGenerados.add(numero);
    numerosArray.push(numero); // Agrega el número al arreglo
    crearCajaNumero(numero);
  }

  function crearCajaNumero(numero) {
    const numberContainer = document.getElementById("number-container");

    // Convertir el número en string con formato "01", "02", etc.
    const numeroFormateado = numero.toString().padStart(2, "0");

    const box = document.createElement("div");
    box.classList.add("box");
    box.textContent = numeroFormateado;
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
