const express = require('express');
const router = express.Router();
var cors = require('../utils/cors.util.js');

const bcrypt = require('bcrypt');

const User = require('../models/user.model');

const notSupported = (req, res, next) => {
    next(new Error('not implemented'));
};

/* 

// SAMPLE FUNCTION TEMPLATE

async function funcname(req, res){
    const data = req.body.data;

    try {

    }
    catch(error){
        return res.status(400).json({ status: 400, err: 'ERROR' });
    }
}

// SAMPLE ROUTE TEMPLATE

router
    .route('/routecomeshere')
    .get(notSupported)
    .post(notSupported)
    .delete(notSupported)
    .put(notSupported);


*/

async function getUserById(req, res) {
    const userId = req.params.id;

    console.log(userId);

    try {
        const user = await User.findById(userId).exec();
        if (user) {
            return res.status(200).json({ status: 200, data: { user: user } });
        }
    } catch (error) {
        return res
            .status(400)
            .json({ status: 400, err: 'ERROR : User Not Found' });
    }
}

async function deleteUserById(req, res) {
    const userId = req.params.id;
    try {
        const user = await User.findByIdAndDelete(userId).exec();
        return res
            .status(200)
            .json({ status: 200, data: { data: 'User deleted succesfully' } });
    } catch (error) {
        return res
            .status(400)
            .json({ status: 400, err: 'ERROR : User Not Found' });
    }
}

router
    .route('/:id')
    .options(cors.whitelist, function (request, response, next) {
        response.sendStatus(200);
        next();
    })
    .get(getUserById)
    .post(notSupported)
    .delete(deleteUserById)
    .put(notSupported);

module.exports = router;
