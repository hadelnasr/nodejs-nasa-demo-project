const express = require('express');
const cors = require('cors');
const app = express();

const planetsRouter = require('./routes/planets/planets.router');
const launchesRouter = require('./routes/launches/launches.router');

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use('/planets', planetsRouter);
app.use('/launches', launchesRouter);

module.exports = app;