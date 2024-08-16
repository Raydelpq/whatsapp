require('dotenv').config();

const { initWhatsapp } = require("./config/whatsappLocalAuth");

const Server = require('./config/server');

const server = new Server();

server.listen();

initWhatsapp();