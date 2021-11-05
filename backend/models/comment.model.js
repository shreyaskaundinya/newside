const mongoose = require('mongoose');

var Comment = new mongoose.Schema({
    userId: {
        type: String,
    },
    username: {
        type: String,
    },
    desc: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Comment', Comment);
