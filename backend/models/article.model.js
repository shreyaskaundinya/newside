const mongoose = require('mongoose');

var Article = new mongoose.Schema({
    author: {
        type: String,
    },
    title: {
        type: String,
        unique: true,
    },
    summary: {
        type: String,
    },
    topic: {
        type: String,
    },
    slug: {
        type: String,
    },
    link: {
        type: String,
    },
    media: {
        type: String,
    },
    published_date: {
        type: String,
    },
    created: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Article', Article);
