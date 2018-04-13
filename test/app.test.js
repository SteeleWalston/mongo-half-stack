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

    it('saves another pokemon', () => {
        return chai.request(app)
            .post('/pokemons')
            .send(char)
            .then(({ body }) => {
                assert.ok(body._id);
                assert.equal(body.name, char.name);
                char = body;
            });
    });

    it('gets all pokemen', () => {
        return chai.request(app)
            .get('/pokemons')
            .then(({ body }) => {
                assert.deepEqual(body, [bulb, char]);
            });
    });

    it('gets one pokemon', () => {
        return chai.request(app)
            .get(`/pokemons/${bulb._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, bulb);
            });
    });

    it('updates a pokeman', () => {
        return chai.request(app)
            .put(`/pokemons/${char._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, char);
            });
    });

    after(() => mongo.client.close());

});