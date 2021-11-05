const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// const config = require('./utils/project');

const app = express();
const port = 4000;

const UserRoute = require('./routes/user.route');
const LoginRoute = require('./routes/login.route');
const SignupRoute = require('./routes/signup.route');

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

// app.use("/article", ArticleRoute)

app.use('/user', UserRoute);
app.use('/login', LoginRoute);
app.use('/signup', SignupRoute);

// app.use("/comment", CommentRoute)
// app.use("/bookmark", BookmarkRoute)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
