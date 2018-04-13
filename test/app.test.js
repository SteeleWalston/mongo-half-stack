require('dotenv').config({ path: '../.env' });
const mongo = require('../lib/db-client');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../lib/app');

chai.use(chaiHttp);
const { assert } = chai;

describe('Pokemons API', () => {

    before(() => {
        return mongo.then(db => {
            db.collection('pokemons').remove();
        });
    });

    let bulb = {
        name: 'Bulbasuar',
        type: 'Grass'
    };

    let char = {
        name: 'Charmander',
        type: 'Fire'
    };

    it('saves a pokemon', () => {
        return chai.request(app)
            .post('/pokemons')
            .send(bulb)
            .then(({ body }) => {
                assert.ok(body._id);
                assert.equal(body.name, bulb.name);
                bulb = body;
            });
    });

});