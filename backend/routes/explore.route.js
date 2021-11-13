const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();

require('dotenv').config();

const Article = require('../models/article.model');

const notSupported = (req, res) => {
    res.statusCode = 405;
    res.end(`${req.method} not supported on ${req.originalUrl}`);
};

async function getExploreArticles(req, res) {
    const apiKey = process.env.NEWS_API_KEY;
    // console.log('EXPLORE ARTICLES AGJDLGDAGK');
    try {
        //  get posts
        const topics = [
            'News',
            'Sport',
            'Tech',
            'Finance',
            'Politics',
            'Business',
            'Entertainment',
            'Science',
        ];
        //Wont this work?
        var promises = [];
        topics.forEach(async (topic) => {
            try {
                const posts = Article.find({ topic: topic.toLowerCase() })
                    .sort({ created: -1 })
                    .limit(5)
                    .exec();
                promises.push(Promise.resolve(posts));
            } catch (error) {}
        });
        Promise.all(promises).then((values) => {
            return res.status(200).json({ status: 200, topicsNews: values });
        });
        // console.log(topicsNews);
        // return res.status(200).json({ status: 200, topicsNews: topicsNews });
    } catch (error) {
        return res.status(400).json({ status: 400, err: 'ERROR' });
    }
}

router
    .route('/')
    .get(getExploreArticles)
    .post(notSupported)
    .put(notSupported)
    .delete(notSupported);

module.exports = router;

/*
try {
                    axios
                        .get(
                            `https://api.newscatcherapi.com/v2/latest_headlines?topic=${topic}&page_size=5&lang=en`,
                            {
                                headers: {
                                    'x-api-key': apiKey,
                                },
                            }
                        )
                        .then(async (resp) => {
                            const fetchedArticles = resp.data.articles;
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

                            try {
                                const articles = await Article.insertMany(
                                    articlesToBeUploaded,
                                    {
                                        ordered: false,
                                    }
                                );
                            } catch (error) {}
                        })

                        .catch((error) => {
                            console.log(error.message);
                        });
                } catch (error) {
                    // error fetching
                }

*/
