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
    findOne(_id) {
        const idObj = { _id : ObjectId(_id) };
        return mongo.then(db => {
            return db.collection('pokemons')
                .findOne(idObj);
        });
    }, 
    update(id) {
        const idObj = { _id : ObjectId(id) };
        console.log(idObj);
        return mongo.then(db => {
            return db.collection('pokemons')
                .update(
                    idObj, {
                        $set: {
                            type: 'FIRE'
                        }
                    });
                
        });
    }
};