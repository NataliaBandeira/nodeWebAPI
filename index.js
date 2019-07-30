const Joi = require('joi');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const mongoose = require('mongoose');
const logger = require('./logger');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());

app.use(logger);

console.log(`Application name ${config.get('name')}`);
console.log(`Mail Server ${config.get('mail.host')}`);

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan engabled...');
}
// mongoose.connect('')
// server.use(bodyParser.json());
// server.use(bodyParser.urlencoded({
//     extended: true
// }));
// 

const genres = [
    { id: 1, genre: "Pop" },
    { id: 2, genre: "Folk" },
    { id: 3, genre: "Rock" },
    { id: 4, genre: "Country" },
    { id: 5, genre: "Samba" },
    { id: 6, genre: "Classical" },
    { id: 7, genre: "R&B" }
];

app.get('/', (req, res) => {
    res.send('Hello Express');
});

app.get('/about', (req, res) => {
    res.send('About page');
});

app.get('/api/genres/', (req, res) => {
    res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) {
        return res.status(404).send("Genre is not on the list.");
    }
    res.send(genre);
});

app.post('/api/genres', (req, res) => {

    const { error } = validategenre(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const genre = {
        id: genres.length + 1,
        genre: req.body.genre
    }

    genres.push(genre);
    res.send(genre);
});

app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) {
        return res.status(404).send("Genre is not on the list.");
    }

    const { error } = validategenre(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    genre.genre = req.body.genre;

    res.send(genre);
});

app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) {
        return res.status(404).send("Genre is not on the list.");
    }

    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genre);
});

function validategenre(genre) {
    const schema = {
        genre: Joi.string().min(3).required()
    };

    return Joi.validate(genre, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running at ${port}`);
}); 