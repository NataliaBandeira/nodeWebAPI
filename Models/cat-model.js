import mongoose, { mongo } from 'mongoose';

var catSchma = mongoose.Schema({
    name: String,
    age: Number,
    type: String
});

module.exports = mongoose.model('Cat', catSchma);
