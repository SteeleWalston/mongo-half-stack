const notFound = require('./not-found');
const pokemon = require('../models/pokemon');

const get = (req, res) => {
    const _id = req.paths[1];
    _id ? getOne(_id, req, res) : getAll(req, res);
};

const getOne = (_id, req, res) => {
    pokemon.findOne(_id)
        .then(one => {
            res.end(JSON.stringify(one));
        });
};

const getAll = (req, res) => {
    pokemon.find().then(pokemons => {
        res.end(JSON.stringify(pokemons));
    });
};

const post = (req, res) => {
    pokemon.insert(req.body).then(saved => {
        res.end(JSON.stringify(saved));
    });
};

const put = (req, res) => {
    const id = req.paths[1];
    pokemon.update(id).then(updated => {
        res.end(JSON.stringify(updated));
    });
};

const del = (req, res) => {
    pokemon.delete(req.paths[1]).then(() => {
        res.end(JSON.stringify({ removed: true }));  
    });
};

const methods = { get, post, put, delete: del };


module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};