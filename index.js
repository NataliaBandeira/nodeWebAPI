const express = require('express');
const Joi = require('joi');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const _ = require('underscore');
const app = express();

app.use(express.json());

// mongoose.connect('')
// server.use(bodyParser.json());
// server.use(bodyParser.urlencoded({
//     extended: true
// }));
// 
// var cats = require('./cats.js')(app)

const courses = [
    { id: 1, course: "course1" },
    { id: 2, course: "course2" },
    { id: 3, course: "course3" }
];

app.get('/', (req, res) => {
    res.send('Hello Express');
});

app.get('/about', (req, res) => {
    res.send('About page');
});

app.get('/api/courses/', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send("Id does not exist on array. ");
    }
    res.send(course);
});

app.post('/api/courses', (req, res) => {
    const schema = {
        // name = Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);

    if (result.error) {
        res.status(400).send(result.error);
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }

    courses.push(course);
    res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running at ${port}`);
}); 