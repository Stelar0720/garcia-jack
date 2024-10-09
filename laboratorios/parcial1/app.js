const NumberGeneratorModule = (function () {
  let numerosGenerados = new Set();

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
    crearCajaNumero(numero);
  }

  function crearCajaNumero(numero) {
    const numberContainer = document.getElementById("number-container");
    const box = document.createElement("div");
    box.classList.add("box");
    box.textContent = numero;
    numberContainer.appendChild(box);
  }

  return {
    generarNumeroAleatorio: generarNumeroAleatorio,
  };
})();

document.getElementById("btn-generar").addEventListener("click", function () {
  NumberGeneratorModule.generarNumeroAleatorio();
});
