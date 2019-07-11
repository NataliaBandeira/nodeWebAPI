var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

mongoose.connect('')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var cats = require('./cats.js')(app)

var server = app.listen(3000, function() {
    console.log('Server running at htp://127.0.0.1:3000/');
});