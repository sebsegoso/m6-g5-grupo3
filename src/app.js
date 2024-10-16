const express = require("express");
const { getPokemons } = require("./pokemonService");
const app = express();
const port = 3000;

let currentGen = 1;

app.get("/pokemones", async (req, res) => {
  try {
    const gen = parseInt(req.query.gen) || 1; // Por defecto, genera la 1 si no se pasa parámetro
    const pokemons = await getPokemons(gen);
    res.status(200).json(pokemons);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los pokémones" });
  }
});

app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
