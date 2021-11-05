const express = require('express');
const router = express.Router();
var cors = require('../utils/cors.util.js');

const bcrypt = require('bcrypt');

const User = require('../models/user.model');

const notSupported = (req, res, next) => {
    next(new Error('not implemented'));
};

async function addNewUser(req, res) {
    const data = req.body.data;

    // check for duplicate username
    try {
        const userFound = await User.findOne({ username: data.username });
        if (userFound.username) {
            return res
                .status(400)
                .json({ status: 400, err: 'ERROR : Duplicate User' });
        }
    } catch (error) {}

    // add the user
    try {
        const salt = bcrypt.genSaltSync(10);
        data.password = bcrypt.hashSync(data.password, salt);

        const newUser = await User.create(data);
        newUser.save();
        return res.status(200).json({ status: 200, data: { newUser } });
    } catch (error) {
        return res.status(400).json({ status: 400, err: 'ERROR' });
    }
}

router
    .route('/')
    .options(cors.whitelist, function (request, response, next) {
        response.sendStatus(200);
        next();
    })
    .get(notSupported)
    .post(addNewUser);

module.exports = router;
