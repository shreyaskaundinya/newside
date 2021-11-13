const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();

require('dotenv').config();

const Article = require('../models/article.model');

const notSupported = (req, res) => {
    res.statusCode = 405;
    res.end(`${req.method} not supported on ${req.originalUrl}`);
};

async function getArticlesFromApi(topic, page) {
    const apiKey = process.env.NEWS_API_KEY;
    const resp = await axios.get(
        `https://api.newscatcherapi.com/v2/latest_headlines?topic=${topic}&page_size=10&lang=en`,
        {
            headers: {
                'x-api-key': apiKey,
            },
        }
    );
    try {
        const fetchedArticles = resp.data.articles;
        console.log('LENGTH: ', fetchedArticles.length);
        const articlesToBeUploaded = fetchedArticles.map((a) => ({
            author: a.author,
            title: a.title,
            summary: a.summary,
            topic: a.topic,
            slug: a.title.split(' ').join('-'),
            link: a.link,
            media: a.media,
            published_date: a.published_date,
        }));
        try {
            const articles = await Article.insertMany(articlesToBeUploaded, {
                ordered: false,
            });
            return articles;
        } catch (error) {
            // error writing to db
            const posts = Article.find({ topic: topic })
                .sort({ created: -1 })
                .limit(page * 10)
                .exec();
            return posts;
        }
    } catch (error) {
        const posts = Article.find({ topic: topic })
            .sort({ created: -1 })
            .limit(page * 10)
            .exec();
        return posts;
    }
}

function toSeconds(timstamp) {
    return (
        timestamp.getHours() * 3600 +
        timestamp.getMinutes() * 60 +
        timestamp.getSeconds()
    );
}

async function getArticlesFromDb(topic, page) {
    const posts = Article.find({ topic: topic })
        .sort({ created: -1 })
        .limit(page * 10)
        .exec();

    return posts;
}

async function getArticlesByTopic(req, res) {
    const topic = req.params.topic.toLowerCase();
    const page = req.params.page ?? 1;

    const apiKey = process.env.NEWS_API_KEY;

    try {
        //  get posts from db
        const posts = await getArticlesFromDb(topic, page);

        if (posts?.length <= 0) {
            try {
                const posts = await getArticlesFromApi(topic, page);
                return res.status(200).json({
                    status: 200,
                    articles: posts,
                });
            } catch (error) {
                return res.status(200).json({
                    status: 200,
                    articles: posts,
                });
            }
        } else {
            const dateNow = new Date();
            const b = posts[0];
            const currentTime = toSeconds(dateNow);
            const articleTime = toSeconds(b.created);

            const diff = currentTime - articleTime;

            if (diff > 300) {
                // stale data -> get articles from api
                try {
                    const posts = await getArticlesFromApi(topic, page);
                    return res.status(200).json({
                        status: 200,
                        articles: posts,
                    });
                } catch (error) {
                    return res.status(200).json({
                        status: 200,
                        articles: posts,
                    });
                }
            } else {
                // fresh articles exist -> send existing data
                return res.status(200).json({
                    status: 200,
                    articles: posts,
                });
            }
        }
    } catch (error) {
        // cannot get articles from db -> try getting articles from api
        try {
            const posts = await getArticlesFromApi(topic, page);
            return res.status(200).json({
                status: 200,
                articles: posts,
            });
        } catch (error) {
            const posts = await getArticlesFromDb(topic, page);
            return res.status(200).json({
                status: 200,
                articles: posts,
            });
        }
    }
}

router
    .route('/:topic/:page')
    .get(getArticlesByTopic)
    .post(notSupported)
    .put(notSupported)
    .delete(notSupported);

module.exports = router;
