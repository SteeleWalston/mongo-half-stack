const http = require('http');
const app = require('./lib/app');
const mongodb = require('./lib/db-client');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pokemons';

mongodb.connect(MONGODB_URI)
    .then(() => console.log('mongo connected', MONGODB_URI)) //eslint-disable-line
    .catch(err => console.log('mongo FAIL', err)); //eslint-disable-line

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log('server running on', server.address().port); //eslint-disable-line
});