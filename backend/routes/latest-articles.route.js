const express = require('express');
const router = express.Router();
const Article = require('../models/article.model');

const axios = require('axios');

require('dotenv').config();

const notSupported = (req, res) => {
    res.statusCode = 405;
    res.end(`${req.method} not supported on ${req.originalUrl}`);
};

async function getLatestArticles(req, res) {
    const staleTime = 300000;
    const apiKey = process.env.NEWS_API_KEY;
    // console.log(apiKey);
    var diff;
    try {
        var articles;
        // find the latest article in db
        articles = await Article.find({})
            .sort({ created: -1 })
            .limit(50)
            .exec();
        console.log(articles.length);
        if (articles.length > 0) {
            const ar = articles[0];

            const d = new Date();
            const currentTime =
                d.getHours() * 3600000 +
                d.getMinutes() * 60000 +
                d.getSeconds() * 1000;
            const articleTime =
                ar.created.getHours() * 3600000 +
                ar.created.getMinutes() * 60000 +
                ar.created.getSeconds() * 1000;

            // check with stale time

            var diff = currentTime - articleTime;
            console.log(diff);

            // if article is older than stale time -> return api call
        }

        if (diff > staleTime || articles.length <= 0) {
            try {
                console.log('FETCHING DATA');
                axios
                    .get(
                        `https://api.newscatcherapi.com/v2/latest_headlines?countries=US&topic=business&page_size=10`,
                        {
                            headers: {
                                'x-api-key': apiKey,
                            },
                        }
                    )
                    .then(async (response) => {
                        var fetchedArticles = response.data.articles;
                        try {
                            const articlesToBeUploaded = fetchedArticles.map(
                                (a) => ({
                                    author: a.author,
                                    title: a.title,
                                    summary: a.summary,
                                    topic: a.topic,
                                    slug: a.title.split(' ').join('-'),
                                    link: a.link,
                                    media: a.media,
                                    published_date: a.published_date,
                                })
                            );
                            const posts = await Article.insertMany(
                                articlesToBeUploaded,
                                { ordered: false }
                            );
                        } catch (error) {
                            const posts = await Article.find({})
                                .sort('created')
                                .limit(100)
                                .exec();
                            return res
                                .status(200)
                                .json({ status: 200, articles: posts });
                        }
                        return res
                            .status(200)
                            .json({ status: 200, articles: posts });
                    })
                    .catch((error) => console.log(error));
            } catch (error) {
                console.log(error);
                return res
                    .status(200)
                    .json({ status: 200, data: { articles } });
            }
        }

        // article is not stale -> return db call
        else {
            console.log('else?');
            return res.status(200).json({ staus: 200, articles: articles });
        }
    } catch (error) {
        console.log(error);
        return res
            .status(400)
            .json({ status: 400, err: 'ERROR:News cant be displayed' });
    }
}

router
    .route('/')
    .get(getLatestArticles)
    .post(notSupported)
    .put(notSupported)
    .delete(notSupported);
module.exports = router;
