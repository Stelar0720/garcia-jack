const PokemonModule = (() => {
  const form = document.getElementById("pokemon-form");
  const searchType = document.getElementById("pokemon-hability-select");
  const pokemonDetails = document.getElementById("pokemon-details");
  const clearButton = form.querySelector('button[type="button"]');
  const inputField = form.elements["pokemon-name"];

  async function handleSearch(event) {
    event.preventDefault();
    pokemonDetails.innerHTML = "";

    const searchValue = inputField.value.toLowerCase();
    const selectedOption = searchType.value;

    if (searchValue.trim() === "") {
      pokemonDetails.innerHTML = `<p>Por favor ingresa un valor para buscar.</p>`;
      return;
    }

    // Mostrar botón "Limpiar" y la sección de detalles al hacer una búsqueda
    clearButton.style.display = "inline-block";
    pokemonDetails.style.display = "block";

    if (selectedOption === "pokemon") {
      await fetchPokemonData(searchValue);
    } else if (selectedOption === "ability") {
      await fetchPokemonByAbility(searchValue);
    } else {
      pokemonDetails.innerHTML = `<p>Opción de búsqueda no válida.</p>`;
    }
  }

  async function fetchPokemonData(pokemonName) {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );
      if (!response.ok) throw new Error("Pokémon no encontrado");
      const pokemonData = await response.json();

      const id = pokemonData.id;
      const frontSprite = pokemonData.sprites.front_default;
      const backSprite = pokemonData.sprites.back_default;
      const weight = pokemonData.weight;
      const height = pokemonData.height;
      const abilities = pokemonData.abilities.map(
        (ability) => `${ability.ability.name}${ability.is_hidden ? ' 👁️' : ''}`
      );

      const speciesResponse = await fetch(pokemonData.species.url);
      const speciesData = await speciesResponse.json();
      const evolutionChainUrl = speciesData.evolution_chain.url;
      const evolutionChain = await fetchEvolutionChain(evolutionChainUrl);

      displayPokemonDetails({
        id,
        name: pokemonName,
        frontSprite,
        backSprite,
        weight,
        height,
        abilities,
        evolutionChain,
      });
    } catch (error) {
      pokemonDetails.innerHTML = `<p>Error: ${error.message}</p>`;
    }
  }

  async function fetchPokemonByAbility(abilityName) {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/ability/${abilityName}`
      );
      if (!response.ok) throw new Error("Habilidad no encontrada");
      const abilityData = await response.json();
  
      const pokemonList = abilityData.pokemon.map((entry) => ({
        name: entry.pokemon.name,
        is_hidden: entry.is_hidden,
      }));
  
      displayPokemonListByAbility(abilityName, pokemonList);
    } catch (error) {
      pokemonDetails.innerHTML = `<p>Error: ${error.message}</p>`;
    }
  }
  

  function displayPokemonListByAbility(abilityName, pokemonList) {
    pokemonDetails.innerHTML = `  
      <div class="habilidad">
      <h2>${capitalizeFirstLetter(abilityName)}</h2>
        <div class="header-habilidad">
        <h3>Who can learn it?</h3>
        <div class="lista-habilidad">
        <ul>
          ${pokemonList
            .map(
              (pokemon) =>
                `<li>${capitalizeFirstLetter(pokemon.name)}${
                  pokemon.is_hidden ? " 👁️" : ""
                }</li>`
            )
            .join("")}
        </ul>
        </div>
        </div>
        </div>
      `;
  }
  

  async function fetchEvolutionChain(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      const chain = [];

      let current = data.chain;
      while (current) {
        chain.push(`${current.species.name}${current.is_baby ? ' 👶' : ''}`);
        current = current.evolves_to[0];
      }

      return chain;
    } catch (error) {
      return ["No disponible"];
    }
  }

  function displayPokemonDetails({
    id,
    name,
    frontSprite,
    backSprite,
    weight,
    height,
    abilities,
    evolutionChain,
  }) {
    pokemonDetails.innerHTML = `
      <h2>${capitalizeFirstLetter(name)} (#${id})</h2>
      <div class="pokemon-info">
        <div class="main-details">
          <div class="sprites">
            <h3>Sprites</h3>
            <img src="${frontSprite}" alt="${name} front">
            <img src="${backSprite}" alt="${name} back">
          </div>
          <div class="weight-height">
            <h3>Weight / Height</h3>
            <p>${weight / 10} kg / ${height / 10} m</p>
          </div>
        </div>
        <div class="additional-info">
          <div class="evolution-chain">
            <h3>Evolution Chain</h3>
            <div class="lista-puntos">
            <ul>
              ${evolutionChain
                .map(
                  (evolution) => `<li>${capitalizeFirstLetter(evolution)}</li>`
                )
                .join("")}
            </ul>
            </div>
          </div>
          <div class="abilities">
            <h3>Abilities</h3>
            <div class="lista-puntos">
            <ul>
              ${abilities
                .map((ability) => `<li>${capitalizeFirstLetter(ability)}</li>`)
                .join("")}
            </ul>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function clearResults() {
    inputField.value = ""; // Limpiar el campo de entrada
    pokemonDetails.innerHTML = ""; // Limpiar los resultados
    pokemonDetails.style.display = "none"; // Ocultar los resultados
    clearButton.style.display = "none"; // Ocultar el botón de limpiar
  }

  function init() {
    form.addEventListener("submit", handleSearch);
    clearButton.addEventListener("click", clearResults);
  }

  return {
    init,
  };
})();

document.addEventListener("DOMContentLoaded", PokemonModule.init);







