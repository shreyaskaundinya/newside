const mongoose = require('mongoose');

var User = new mongoose.Schema({
    name: {
        type: String,
    },
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    interests: {
        type: Array,
        default: [],
    },
    location: {
        type: { longitude: Number, latitude: Number },
        default: {
            latitude: 0,
            longitude: 0,
        },
    },
    created: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('User', User);
