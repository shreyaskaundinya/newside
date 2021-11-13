const mongoose = require('mongoose');

var Comment = new mongoose.Schema({
    userId: {
        type: mongoose.ObjectId,
    },
    username: {
        type: String,
    },
    comment: {
        type: String,
    },
    articleId: {
        type: mongoose.ObjectId,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Comment', Comment);
