const express = require('express');
const { initWhatsapp } = require('./whatsappLocalAuth');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            wsp: '/api/v1/',
        }

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();


    }

    middlewares() {

        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio Público
        this.app.use(express.static('public'));

    }

    routes() {

        this.app.use(this.paths.wsp, require('../routes/route'));
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }


}

module.exports = Server;