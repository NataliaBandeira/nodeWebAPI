const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const genreSchema = new mongoose.Schema({
    name: String,
    creationDate: { type: Date, default: Date.now }
});

const Genre = mongoose.model('genres', genreSchema);

router.get('/', (req, res) => {
    Genre.find()
        .sort({ name: 1 })
        .select({ name: 1, creationDate: 1 })
        .then((response) => {
            res.send(response);
        });
});

router.get('/:name', (req, res) => {
    Genre.find({ name: req.params.name }).then((response) => {
        if (!response) {
            return res.status(404).send("Genre is not on the list.");
        }
        res.send(response);
    });
});

router.post('/', (req, res) => {

    const { error } = validategenre(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const genre = new Genre({
        name: req.body.name
    });

    genre.save().then(() => {
        res.send(result);
    });
});

router.put('/:name', (req, res) => {
    Genre.find({ name: req.params.name }).then((response) => {
        if (!response) {
            return res.status(404).send("Genre is not on the list.");
        }

        const { error } = validategenre(req.body);

        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        response.put({ name: req.params.name });
        response.save().then(() => {
            res.send(genre);
        });
    });


});

router.delete('/:name', (req, res) => {
    Genre.find({ name: req.params.name }).then((response) => {
        if (!response) {
            return res.status(404).send("Genre is not on the list.");
        }
        Genre.delete(response);
        res.send(response);
    });
});

function validategenre(genre) {
    const schema = {
        genre: Joi.string().min(3).required()
    };

    return Joi.validate(genre, schema);
}

module.exports = router;