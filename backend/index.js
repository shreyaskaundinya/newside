const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// const config = require('./utils/project');

const app = express();
const port = 4000;

const UserRoute = require('./routes/user.route');
const LoginRoute = require('./routes/login.route');
const SignupRoute = require('./routes/signup.route');
const ArticleCommentsRoute = require('./routes/article-comments.route');
const LatestArticlesRoute = require('./routes/latest-articles.route');
const BookmarkRoute = require('./routes/bookmark.route');
const TopicArticlesRoute = require('./routes/topic-articles.route');
const WeatherRoute = require('./routes/weather.route');
const ArticleByIdRoute = require('./routes/article-id.route');
const ExploreRoute = require('./routes/explore.route');

app.use(
    cors({
        origin: '*',
        optionsSuccessStatus: 200,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/NewSide', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;
mongoose.connection.on(
    'error',
    console.error.bind(console, 'MongoDB Connection Error...')
);

app.use('/user', UserRoute);
app.use('/login', LoginRoute);
app.use('/signup', SignupRoute);
app.use('/articlecomments', ArticleCommentsRoute);
app.use('/latest', LatestArticlesRoute);
app.use('/bookmark', BookmarkRoute);
app.use('/topicarticles', TopicArticlesRoute);
app.use('/weather', WeatherRoute);
app.use('/article', ArticleByIdRoute);
app.use('/explore', ExploreRoute);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
