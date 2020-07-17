const uuid = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../Models/http-errors');

const getUsers = (req, res, next) => {
    res.json({users: DUMMY_GARDEN });
};

const signup = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError('Invalid inputs passed, please check your data.', 422);
    }

    const { name, email, password } = req.body;

    const hasUsers = DUMMY_GARDEN.find(u => u.email === email);
    if (hasUsers) {
        throw new HttpError('Could not create user. Email entered already exists.', 422)
    }

    const createdUser = {
        id: uuid(),
        name,
        email,password
    };

    DUMMY_GARDEN.push(createdUser);

    res.status(201).json({user: createdUser});
};

const login = (req, res, next) => {
    const { email, password } = req.body;

    const identifiedUser = DUMMY_GARDEN.find(u => u.email === email);
    if(!identifiedUser || identifiedUser.password !== password) {
        throw new HttpError('Could not identify user, credentials seem to be wrong.', 401)
    }

    res.json({message: 'Logged In!'});
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
