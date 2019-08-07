const Joi = require('joi');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const mongoose = require('mongoose');
const logger = require('./midleware/logger');
const genres = require('./routes/genres');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/genres', genres);

app.use(logger);

mongoose.connect('mongodb+srv://adminNode:Senha123@nodetest-om3z3.mongodb.net/Pineapple?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connected with MongoDB');
    })
    .catch(err => {
        console.log("Could not connect with MongoDB");
    });

console.log(`Application name ${config.get('name')}`);
console.log(`Mail Server ${config.get('mail.host')}`);

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan engabled...');
}

app.get('/', (req, res) => {
    res.send('Hello Express');
});

app.get('/about', (req, res) => {
    res.send('About page');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running at ${port}`);
}); 