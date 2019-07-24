const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const server = express();

// mongoose.connect('')
// server.use(bodyParser.json());
// server.use(bodyParser.urlencoded({
//     extended: true
// }));
// 
// var cats = require('./cats.js')(app)

server.get('/', (req, res) => {
    res.send('Hello Express');
});

server.get('/about', (req, res) => {
    res.send('bout page');
});

server.listen(3000, function () {
    console.log('Server running at http://127.0.0.1:3000/');
}); 