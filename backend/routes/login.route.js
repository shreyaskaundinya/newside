const express = require('express');
const router = express.Router();
var cors = require('../utils/cors.util.js');

const bcrypt = require('bcrypt');

const User = require('../models/user.model');

const notSupported = (req, res, next) => {
    next(new Error('not implemented'));
};

async function loginUser(req, res) {
    const { username, password } = req.body.data;
    try {
        const user = await User.findOne({ username: username }).exec();
        var result = bcrypt.compareSync(password, user.password);
        if (result == true) {
            return res.status(200).json({ status: 200, user: user });
        } else {
            return res
                .status(400)
                .json({ status: 400, err: 'ERROR: laIncorrect password' });
        }
    } catch {
        return res
            .status(400)
            .json({ status: 400, err: 'ERROR : User not found' });
    }
    // find user by username
    // user not found
    // user found
    // compare the password hash using bcrypy.compareSync
    // wrong password
    // correct password
}

router
    .route('/')
    .options(cors.whitelist, function (request, response, next) {
        response.sendStatus(200);
        next();
    })
    .get(notSupported)
    .post(loginUser);

module.exports = router;
