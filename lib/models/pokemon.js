const mongo = require('../db-client');
const { ObjectId } = require('mongodb');

module.exports = {
    insert(pokemon) {
        return mongo.then(db => {
            return db.collection('pokemons')
                .insert(pokemon)
                .then(result => result.ops[0]);
        });
    }, 
    find() {
        return mongo.then(db => {
            return db.collection('pokemons')
                .find()
                .toArray();
        });

    },
    findOne() {
        return mongo.then(db => {
            return db.collection('pokemons')
                .findOne();
        });
    }, 
    update() {
        return mongo.then(db => {
            return db.collection('pokemons')
                .update({
                    _id: ObjectId('5acfd7f28772a450ad6828ce')
                }, {
                    $set: {
                        type: 'FIRE'
                    }
                });
        });
    }
};