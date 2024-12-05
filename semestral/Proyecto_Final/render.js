export const renderAgents = (container, agents) => {
  container.innerHTML = ""; // Limpiar contenido previo

  if (agents.length === 0) {
    container.innerHTML = "<p>No agents found.</p>";
    return;
  }

  agents.forEach((agent) => {
    const card = document.createElement("div");
    card.classList.add("agent-card");
    card.innerHTML = `
            <img src="${agent.displayIcon}" alt="${agent.displayName}">
            <div class="agent-name">
    <h3>${agent.displayName}</h3>
</div>

            <p>${agent.role ? agent.role.displayName : "No Role"}</p>
        `;
    container.appendChild(card);
  });
};
