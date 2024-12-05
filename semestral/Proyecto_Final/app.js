/*js mapas */
import { fetchMaps } from "./maps.js";

document.addEventListener("DOMContentLoaded", () => {
  const mapContainer = document.getElementById("mapContainer");
  const mapTypeFilter = document.getElementById("mapType");
  const difficultyFilter = document.getElementById("difficulty");
  const showMapsButton = document.getElementById("showMapsButton");

  async function renderMaps() {
    const maps = await fetchMaps();

    const selectedMapType = mapTypeFilter.value;
    const selectedDifficulty = difficultyFilter.value;

    const filteredMaps = maps.filter((map) => {
      const matchesType =
        selectedMapType === "all" || map.type === selectedMapType;
      const matchesDifficulty =
        selectedDifficulty === "all" || map.difficulty === selectedDifficulty;
      return matchesType && matchesDifficulty;
    });

    mapContainer.innerHTML =
      filteredMaps.length > 0
        ? filteredMaps
            .map(
              (map) => `
                <div class="map-card">
                    <img src="${map.displayIcon}" alt="${map.displayName}">
                    <h3>${map.displayName}</h3>
                    <p>${map.description}</p>
                </div>
            `
            )
            .join("")
        : `<p>No se encontraron mapas que coincidan con los filtros seleccionados.</p>`;
  }

  showMapsButton.addEventListener("click", renderMaps);
});

/* js armas */
import { fetchWeapons, filterWeapons } from "./weapons.js";

document.addEventListener("DOMContentLoaded", () => {
  const weaponsContainer = document.getElementById("weaponsContainer");
  const checkboxes = document.querySelectorAll(
    '.sidebar input[type="checkbox"]'
  );

  // Fetch and display all weapons initially
  fetchWeapons().then((weapons) => {
    displayWeapons(weapons);
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        const selectedTypes = Array.from(checkboxes)
          .filter((checkbox) => checkbox.checked)
          .map((checkbox) => checkbox.value);
        const filteredWeapons = filterWeapons(weapons, selectedTypes);
        displayWeapons(filteredWeapons);
      });
    });
  });

  function displayWeapons(weapons) {
    weaponsContainer.innerHTML = "";
    weapons.forEach((weapon) => {
      const weaponCard = document.createElement("div");
      weaponCard.classList.add("weapon-card");
      weaponCard.innerHTML = `
                <img src="${weapon.displayIcon}" alt="${weapon.displayName}">
                <h3>${weapon.displayName}</h3>
                <p>Price: ${weapon.shopData ? weapon.shopData.cost : "Free"}</p>
                <p>Type: ${weapon.category.split("::")[1]}</p>
            `;
      weaponsContainer.appendChild(weaponCard);
    });
  }
});

/*js agentes*/
import { fetchAgents } from "./data.js";
import { renderAgents } from "./render.js";

const htmlElements = {
  searchInput: document.getElementById("agent-search"),
  agentsList: document.getElementById("agents-list"),
  filterButtons: document.querySelectorAll(".filter-btn"),
  searchButton: document.getElementById("search-btn"),
};

let agents = [];
let currentRole = "";

const filterAgents = () => {
  const query = htmlElements.searchInput.value.toLowerCase();
  const filteredAgents = agents.filter((agent) => {
    const matchesRole = currentRole
      ? agent.role?.displayName === currentRole
      : true;
    const matchesQuery = agent.displayName.toLowerCase().includes(query);
    return matchesRole && matchesQuery;
  });
  renderAgents(htmlElements.agentsList, filteredAgents);
};

const init = async () => {
  htmlElements.agentsList.innerHTML = "<p>Loading agents...</p>";
  agents = await fetchAgents();
  renderAgents(htmlElements.agentsList, agents);

  htmlElements.searchInput.addEventListener("input", filterAgents);
  htmlElements.searchButton.addEventListener("click", filterAgents);

  htmlElements.filterButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      currentRole = event.target.dataset.role;
      htmlElements.filterButtons.forEach((btn) =>
        btn.classList.remove("active")
      );
      event.target.classList.add("active");
      filterAgents();
    });
  });
};

init();

/*js player*/
import { fetchPlayerData } from "./players.js";

const searchButton = document.getElementById("search-button");
const playerDataContainer = document.getElementById("player-data");

searchButton.addEventListener("click", async () => {
  const username = document.getElementById("username").value.trim();
  const tag = document.getElementById("tag").value.trim();
  const region = document.getElementById("region").value;

  if (username && tag) {
    const playerData = await fetchPlayerData(username, tag, region);
    displayPlayerData(playerData);
  } else {
    alert("Por favor, ingresa tanto el nombre de usuario como el tag.");
  }
});

function displayPlayerData(data) {
  playerDataContainer.innerHTML = "";

  if (!data) {
    playerDataContainer.innerHTML =
      "<p>No se encontraron datos para este jugador.</p>";
    return;
  }

  const playerCard = `
        <div class="player-card">
            <h2>Jugador: ${data.username}</h2>
            <p>Rango Actual: ${data.rank}</p>
            <p>Ratio KDA: ${data.kda}</p>
            <p>Partidas Totales: ${data.games}</p>
            <p>Victorias: ${data.wins}</p>
            <p>Derrotas: ${data.losses}</p>
        </div>
    `;
  playerDataContainer.innerHTML = playerCard;
}
