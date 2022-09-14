const PORT = process.env.PORT || 8000;
const http = require('http');

// this way we treated express js as a middleware added on top of node http server
const app = require('./app');

const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
})
