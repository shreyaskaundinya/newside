const express = require('express');
const router = express.Router();
var cors = require('../utils/cors.util.js');

const bcrypt = require('bcrypt');

const User = require('../models/user.model');

const notSupported = (req, res, next) => {
    next(new Error('not implemented'));
};

async function loginUser(req, res) {}

router
    .route('/')
    .options(cors.whitelist, function (request, response, next) {
        response.sendStatus(200);
        next();
    })
    .get(notSupported)
    .post(loginUser);

module.exports = router;
