const express = require('express');
const bodyParser = require('body-parser');

const gardenRoutes = require('./routes/garden-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./Models/http-errors');

const app = express();


app.use(bodyParser.json());

app.use('/api/garden', gardenRoutes);
app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
});
// ERROR HANDLING MIDDLEWARE FUNCTION
app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
});


app.listen(5000);