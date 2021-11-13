const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// const Article = require('../models/article.model');
const Comment = require('../models/Comment.model');

const notSupported = (req, res) => {
    res.statusCode = 405;
    res.end(`${req.method} not supported on ${req.originalUrl}`);
};

async function getCommentsForArticleById(req, res) {
    const articleId = req.params.id;
    try {
        // find comments for post
        const comments = await Comment.find({
            articleId: mongoose.Types.ObjectId(articleId),
        }).exec();
        return res.status(200).json({ status: 200, comments: comments });
    } catch (error) {
        return res
            .status(400)
            .json({ status: 400, err: 'ERROR : Article not found' });
    }
}

async function addComment(req, res) {
    const articleId = req.params.id;
    const { userId, username, comment } = req.body.data;
    // add new comment
    try {
        const newComment = await Comment.create({
            userId: userId,
            username: username,
            comment: comment,
            articleId: articleId,
        });
        newComment.save();
        return res.status(200).json({ status: 200, comment: req.body.data });
    } catch (error) {
        return res
            .status(400)
            .json({ status: 400, err: 'ERROR : Comment could not be added' });
    }
}

router
    .route('/:id')
    .get(getCommentsForArticleById)
    .post(addComment)
    .put(notSupported)
    .delete(notSupported);
module.exports = router;
