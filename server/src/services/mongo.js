const mongoose = require('mongoose');
// const MONGO_URL = `mongodb+srv://nasa-api:VoVlJFGjtmII5crL@testingmongodbcluster.ipsg73t.mongodb.net/nasa?retryWrites=true&w=majority`;
const MONGO_URL = `mongodb://localhost:27017/nasa`;

mongoose.connection.once('open', () => {
    console.log('Mongodb connection ready!');
});

mongoose.connection.on('error', (err) => {
    console.error(err);
});

async function mongoConnect () {
    await mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        // useFindAndModify: false,
        // useCreateIndex: true,
        // useUnifiedTopolgy: true
    });
}

async function mongoDisconnect () {
    await mongoose.disconnect();
}

module.exports = {
    mongoConnect,
    mongoDisconnect
}