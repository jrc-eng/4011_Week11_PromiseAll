const express = require('express')
const app = express()
const port = 3000
const { corsOptionsRequests, corsSimpleRequests } = require('./middleware/cors')
const bodyParser = require('body-parser')
const helloWorld = require('./services/helloworld')
const removePoweredBy = require('./middleware/removePoweredBy')

const PokemonGames = require('./services/pokemonGames');

app.options('*', corsOptionsRequests)
app.use(corsSimpleRequests)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(removePoweredBy)

app.get('/', helloWorld)

console.log('PokemonGames');

app.get('/games', PokemonGames)

//Legacy Post method
app.post('/post', (req, res) => {
  res.send(`Your username is ${req.body.username}`)
})

//Listen
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})