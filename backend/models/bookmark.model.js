const mongoose = require('mongoose');

var Bookmark = new mongoose.Schema({
    userId: {
        type: String,
    },
    articleId: {
        type: String,
    },
    created: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Bookmark', Bookmark);
