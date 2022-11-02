const PORT = process.env.PORT || 8000;
// const MONGO_URL = `mongodb+srv://nasa-api:VoVlJFGjtmII5crL@testingmongodbcluster.ipsg73t.mongodb.net/nasa?retryWrites=true&w=majority`;
const MONGO_URL = `mongodb://localhost:27017/nasa`;
const http = require('http');
const mongoose = require('mongoose');

// this way we treated express js as a middleware added on top of node http server
const app = require('./app');

const {loadPlanetsData} = require('./models/planets.model');

const server = http.createServer(app);

mongoose.connection.once('open', () => {
    console.log('Mongodb connection ready!');
});

mongoose.connection.on('error', (err) => {
    console.error(err);
});


async function startServer() {
    await mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        // useFindAndModify: false,
        // useCreateIndex: true,
        // useUnifiedTopolgy: true
    });
    await loadPlanetsData();

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`);
    })
}

startServer();

