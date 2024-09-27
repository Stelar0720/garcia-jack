function textoreverso(text) {
  return text.split("").reverse().join("");
}

document.addEventListener("DOMContentLoaded", () => {
  const inputElement = document.getElementById("textinput");
  const outputElement = document.getElementById("output");
  const colorPicker = document.getElementById("colorPicker");

  inputElement.addEventListener("input", () => {
    const inputext = inputElement.value;
    const reversotexto = textoreverso(inputext);
    outputElement.textContent = reversotexto;
  });

  colorPicker.addEventListener("change", () => {
    const selectedColor = colorPicker.value;
    outputElement.classList.remove("red", "yellow", "blue");
    outputElement.classList.add(selectedColor);
  });
});
