const express = require('express');
const router = express.Router();

const Bookmark = require('../models/bookmark.model');
const mongoose = require('mongoose');

const notSupported = (req, res) => {
    res.statusCode = 405;
    res.end(`${req.method} not supported on ${req.originalUrl}`);
};

async function getUserBookmarks(req, res) {
    const userId = req.params.id;

    console.log('GET USER BOOKMARKS');
    // get user bookmarks
    try {
        const bookmarks = await Bookmark.aggregate([
            {
                $match: {
                    userId: mongoose.Types.ObjectId(userId),
                },
            },
            {
                $lookup: {
                    from: 'articles',
                    localField: 'articleId',
                    foreignField: '_id',
                    as: 'article',
                },
            },
            {
                $unwind: '$article',
            },
        ]);
        return res.status(200).json({ status: 200, bookmarks: bookmarks });
    } catch (error) {
        return res
            .status(400)
            .json({ status: 400, err: 'ERROR : Bookmarks not found' });
    }
}

async function updateBookmark(req, res) {
    const userId = req.params.id;
    const { articleId } = req.body.data;

    try {
        const presentBookmark = await Bookmark.findOne({
            userId: mongoose.Types.ObjectId(userId),
            articleId: mongoose.Types.ObjectId(articleId),
        });
        if (presentBookmark.articleId && presentBookmark.userId) {
            Bookmark.findOneAndDelete({
                articleId: mongoose.Types.ObjectId(articleId),
            })
                .then(() =>
                    res.status(200).json({
                        status: 200,
                        data: { bookmark: presentBookmark, action: 'removed' },
                    })
                )
                .catch(() => {});
        }
    } catch (error) {
        try {
            const newBookmark = await Bookmark.create({
                userId: mongoose.Types.ObjectId(userId),
                articleId: mongoose.Types.ObjectId(articleId),
            });
            newBookmark.save();
            return res.status(200).json({
                status: 200,
                data: { bookmark: newBookmark, action: 'created' },
            });
        } catch (error) {
            return res.status(400).json({ status: 400, err: 'ERROR' });
        }
    }
    // add new bookmark
}

router.route('/:id').get(getUserBookmarks).post(updateBookmark);

module.exports = router;
