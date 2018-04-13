const mongo = require('../db-client');

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

    }
};