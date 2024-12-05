const API_URL = 'https://valorant-api.com/v1/maps';

export async function fetchMaps() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        return data.data.map(map => ({
            displayName: map.displayName,
            displayIcon: map.splash || map.displayIcon, // Icono o splash como alternativa
            description: map.coordinates || 'Sin descripción disponible',
            type: 'standard', // Simulación de tipo
            difficulty: calculateDifficulty(map.displayName) // Dificultad simulada
        }));
    } catch (error) {
        console.error('Error al obtener mapas:', error);
        return [];
    }
}

function calculateDifficulty(displayName) {
    // Asignar dificultad según el nombre del mapa (simulación lógica)
    const nameLength = displayName.length;
    if (nameLength < 8) return 'easy';
    if (nameLength < 12) return 'medium';
    return 'hard';
}


