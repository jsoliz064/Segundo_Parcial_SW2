require('dotenv').config();
const Server = require('./app/server');


const server = new Server();



server.listen();