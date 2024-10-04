// MODULE PATTERN

const TextModule = (function () {
  // Variables privadas
  let color = "red";

  // Función privada para invertir el texto
  function reverseText(text) {
    return text.split("").reverse().join("");
  }

  // Función privada para cambiar el color del texto
  function updateColor(newColor) {
    color = newColor;
  }

  // Función pública para manejar la actualización del texto y color
  function updateOutput() {
    const inputText = document.getElementById("textinput").value;
    const outputDiv = document.getElementById("output");
    outputDiv.innerText = reverseText(inputText);
    outputDiv.className = color; // Aplica la clase de color
  }

  // Función pública para establecer el color del texto
  function setColor(newColor) {
    updateColor(newColor);
  }

  // API pública
  return {
    updateOutput,
    setColor,
  };
})();

// Event listeners
document
  .getElementById("textinput")
  .addEventListener("input", TextModule.updateOutput);
document.getElementById("colorPicker").addEventListener("change", function (e) {
  TextModule.setColor(e.target.value);
  TextModule.updateOutput(); // Actualiza el texto con el nuevo color
});
