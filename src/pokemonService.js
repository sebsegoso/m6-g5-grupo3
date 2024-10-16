const axios = require('axios');

async function getPokemonData(url) {
    try {
        const response = await axios.get(url);
        const { name, sprites } = response.data;
        return { name, image: sprites.front_default };
    } catch (error) {
        console.error(`Error obteniendo detalles del Pokémon: ${error}`);
        return null;
    }
}

async function getPokemons(gen) {
    try {
        const limits = {
            1: { limit: 151, offset: 0 },    // Gen 1: 1-151
            2: { limit: 100, offset: 151 },   // Gen 2: 152-251
            3: { limit: 135, offset: 251 },   // Gen 3: 252-386
            4: { limit: 107, offset: 386 },   // Gen 4: 387-493
            5: { limit: 156, offset: 493 },   // Gen 5: 494-649
            6: { limit: 72, offset: 649 },    // Gen 6: 650-721
            7: { limit: 88, offset: 721 },    // Gen 7: 722-809
            8: { limit: 96, offset: 809 },    // Gen 8: 810-905
            9: { limit: 120, offset: 905 },   // Gen 9: 906-1025
        };

        const { limit, offset } = limits[gen];
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        const pokemons = response.data.results;

        // Uso de Promise.all 
        const pokemonDetails = await Promise.all(pokemons.map(pokemon => getPokemonData(pokemon.url)));

        return pokemonDetails.filter(pokemon => pokemon !== null);
    } catch (error) {
        console.error('Error obteniendo la lista de Pokémones:', error);
        return [];
    }
}


module.exports = { getPokemons };
