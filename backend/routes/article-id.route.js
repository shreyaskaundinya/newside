const express = require('express');
const router = express.Router();
const Article = require('../models/article.model');

const notSupported = (req, res) => {
    res.statusCode = 405;
    res.end(`${req.method} not supported on ${req.originalUrl}`);
};

async function getArticlesbyId(req, res) {
    const id = req.params.id;
    console.log('HEHE');
    try {
        const article = await Article.findById(id);
        return res.status(200).json({ status: 200, article: article });
    } catch (error) {
        return res.status(400).json({
            status: 400,
            err: 'ERROR : Article Not Found!',
        });
    }
}

router
    .route('/:id')
    .get(getArticlesbyId)
    .post(notSupported)
    .put(notSupported)
    .delete(notSupported);
module.exports = router;
