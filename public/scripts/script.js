async function loadPokemon(gen) {
    try {
        const response = await fetch(`/pokemones?gen=${gen}`);
        const pokemones = await response.json();
        const gallery = document.getElementById('pokemon-gallery');
        gallery.innerHTML = pokemones.map(pokemon => `
            <div class="col">
                <div class="card h-100 text-center">
                    <img src="${pokemon.image}" class="card-img-top" alt="${pokemon.name}">
                    <div class="card-body">
                        <h5 class="card-title">${pokemon.name}</h5>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error cargando Pokémon:', error);
    }
}


document.getElementById('gen1').addEventListener('click', () => loadPokemon(1));
document.getElementById('gen2').addEventListener('click', () => loadPokemon(2));
document.getElementById('gen3').addEventListener('click', () => loadPokemon(3));
document.getElementById('gen4').addEventListener('click', () => loadPokemon(4));
document.getElementById('gen5').addEventListener('click', () => loadPokemon(5));
document.getElementById('gen6').addEventListener('click', () => loadPokemon(6));
document.getElementById('gen7').addEventListener('click', () => loadPokemon(7));
document.getElementById('gen8').addEventListener('click', () => loadPokemon(8));
document.getElementById('gen9').addEventListener('click', () => loadPokemon(9));


window.onload = () => loadPokemon(1);

