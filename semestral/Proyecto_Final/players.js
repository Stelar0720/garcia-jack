export async function fetchPlayerData(username, tag, region) {
  const apiKey = "RGAPI-f3418152-8f24-42e9-934d-48283ffca771"; // Sustituir por clave válida

  const url = `https://${region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${username}/${tag}?api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error al obtener los datos del jugador.");
    }
    const data = await response.json();

    return {
      username: `${username}#${tag}`,
      rank: data.rank || "No disponible",
      kda: data.kda || "No disponible",
      games: data.gamesPlayed || 0,
      wins: data.wins || 0,
      losses: data.losses || 0,
    };
  } catch (error) {
    console.error("Error al obtener los datos del jugador:", error);
    return null;
  }
}
