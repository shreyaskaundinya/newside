const mongoose = require('mongoose');

var Bookmark = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
    },
    articleId: {
        type: mongoose.Types.ObjectId,
    },
    created: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Bookmark', Bookmark);
