const mongoose = require('mongoose');

var Article = new mongoose.Schema({
    author: {
        type: String,
    },
    title: {
        type: String,
    },
    summary: {
        type: String,
    },
    topic: {
        type: String,
    },
    slug: {
        type: Array,
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
});

module.exports = mongoose.model('Article', Article);
