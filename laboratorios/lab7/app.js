const SistemaVotacion = (function () {
  let candidatos = [];
  let totalVotos = 0;

  // Función privada para actualizar la lista de candidatos y la barra de votación
  function mostrarCandidatos() {
    const lista = document.getElementById("listaCandidatos");
    const barraTotal = document.getElementById("barraTotal");
    lista.innerHTML = "";
    barraTotal.innerHTML = "";

    candidatos.forEach((candidato, index) => {
      lista.innerHTML += `
                <div class="candidato">
                    <p class="nombreCandidato">${candidato.nombre} - Votos: ${candidato.votos}</p>
                    <div class="controls">
                        <button onclick="SistemaVotacion.agregarVotos(${index})">+</button>
                        <button onclick="SistemaVotacion.quitarVotos(${index})">-</button>
                    </div>
                </div>
            `;

      const porcentaje =
        totalVotos > 0 ? (candidato.votos / totalVotos) * 100 : 0;
      barraTotal.innerHTML += `
                <div class="bar-fill" style="width: ${porcentaje}%; background-color: ${candidato.color};"></div>
            `;
    });
  }

  // Funciones públicas
  return {
    agregarCandidato: function () {
      const nombre = document.getElementById("nombreCandidato").value;
      const color = document.getElementById("colorCandidato").value;

      if (nombre) {
        const candidato = {
          nombre: nombre,
          color: color,
          votos: 0,
        };
        candidatos.push(candidato);
        mostrarCandidatos();
      }
    },

    agregarVotos: function (index) {
      candidatos[index].votos += 1;
      totalVotos += 1;
      mostrarCandidatos();
    },

    quitarVotos: function (index) {
      if (candidatos[index].votos > 0) {
        candidatos[index].votos -= 1;
        totalVotos -= 1;
        mostrarCandidatos();
      }
    },
  };
})();
