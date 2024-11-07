const PokemonModule = (() => {
  const form = document.getElementById("pokemon-form");
  const searchType = document.getElementById("pokemon-hability-select");
  const pokemonDetails = document.getElementById("pokemon-details");

  async function handleSearch(event) {
    event.preventDefault();
    pokemonDetails.innerHTML = "";

    const pokemonName = form.elements["pokemon-name"].value.toLowerCase();
    const selectedOption = searchType.value;

    if (selectedOption === "pokemon") {
      await fetchPokemonData(pokemonName);
    } else {
      pokemonDetails.innerHTML = `<p>Busca por habilidad no está implementado aún.</p>`;
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
        (ability) => ability.ability.name
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

  async function fetchEvolutionChain(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      const chain = [];

      let current = data.chain;
      while (current) {
        chain.push(current.species.name);
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
        <!-- Main Details Section -->
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
        <!-- Additional Info Section -->
        <div class="additional-info">
          <div class="evolution-chain">
            <h3>Evolution Chain</h3>
            <ul>
              ${evolutionChain
                .map(
                  (evolution) => `<li>${capitalizeFirstLetter(evolution)}</li>`
                )
                .join("")}
            </ul>
          </div>
          <div class="abilities">
            <h3>Abilities</h3>
            <ul>
              ${abilities
                .map((ability) => `<li>${capitalizeFirstLetter(ability)}</li>`)
                .join("")}
            </ul>
          </div>
        </div>
      </div>
    `;
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function init() {
    form.addEventListener("submit", handleSearch);
  }

  return {
    init,
  };
})();

document.addEventListener("DOMContentLoaded", PokemonModule.init);
