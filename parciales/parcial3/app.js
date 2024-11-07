const POKEAPI_URL = "https://pokeapi.co/api/v2/pokemon";

// Función para limpiar el nombre
const sanitizeName = (name) => {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z]/g, "");
};

// Función para obtener datos del Pokémon
const getPokemon = async (name) => {
  try {
    const response = await fetch(`${POKEAPI_URL}/${name}`);
    if (!response.ok) throw new Error("Pokémon no encontrado");
    return await response.json();
  } catch (error) {
    console.error("Error al obtener el Pokémon:", error);
    return null;
  }
};

// Función para renderizar la información del Pokémon
const renderPokemon = (template, pokemon) => {
  if (!pokemon) return;

  const { id, name, sprites, weight, height } = pokemon;
  const html = `
    <div class="pokemon-details">
      <div class="pokemon-details__header">
        <h1>${name.charAt(0).toUpperCase() + name.slice(1)} (${id})</h1>
      </div>
      <div class="pokemon-details__content">
        <div class="pokemon-details__section">
          <h3>Sprites</h3>
          <div class="pokemon-details__sprites">
            <img src="${sprites.front_default}" alt="${name} front" />
            <img src="${sprites.back_default}" alt="${name} back" />
          </div>
        </div>
        <div class="pokemon-details__section">
          <h3>Weight / Height</h3>
          <p class="pokemon-details__info">${weight / 10} kg / ${
    height / 10
  } m</p>
        </div>
      </div>
    </div>
  `;
  template.innerHTML = html;
};

// Función para limpiar los resultados
const clearResults = () => {
  document.getElementById("pokemon-details").innerHTML = "";
  document.querySelector('input[name="pokemon-name"]').value = "";
};

// Lógica de interacción con el DOM
const form = document.getElementById("pokemon-form");
const input = form.querySelector('input[name="pokemon-name"]');
const pokemonDetails = document.getElementById("pokemon-details");

// Evento para el envío del formulario
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const sanitizedInput = sanitizeName(input.value);
  if (!sanitizedInput) return; // Si no hay entrada, no hacer nada

  clearResults(); // Limpiar resultados previos
  const pokemon = await getPokemon(sanitizedInput);
  renderPokemon(pokemonDetails, pokemon);
});
