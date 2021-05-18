const superagent = require("superagent")

const PokemonGames = async (req, res, next) => {

    const pokemonRESP = await superagent.get("https://pokeapi.co/api/v2/pokemon?offset=20&limit=20");

    const pokemon = JSON.parse(pokemonRESP.text)

    //It only calls the first 20 and their URLS.

    const namesAndUrls = pokemon.results;

    const pokeInfo = await Promise.all(namesAndUrls.map(async pokemon =>{
        const url = pokemon.url;
        const response = await superagent.get(url);

        return response

    }))

    const namesAndGames = pokeInfo.map(pokemon => {

        const games = pokemon.game_indices.map(game =>{
            return game.version.name;
        })
        return{
            name: pokemon.name,
            games
        }

    })

    res.send(namesAndGames)
    next()
}

module.exports = PokemonGames