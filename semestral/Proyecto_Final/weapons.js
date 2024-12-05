export async function fetchWeapons() {
    try {
        const response = await fetch('https://valorant-api.com/v1/weapons');
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching weapons:', error);
        return [];
    }
}

export function filterWeapons(weapons, selectedTypes) {
    if (selectedTypes.length === 0) return weapons;

    const typeMapping = {
        Pistol: 'Sidearm',
        Rifle: 'Rifle',
        SMG: 'SMG',
        Sniper: 'Sniper'
    };

    return weapons.filter(weapon => {
        const weaponType = weapon.category.split('::')[1];
        return selectedTypes.some(type => typeMapping[type] === weaponType);
    });
}
