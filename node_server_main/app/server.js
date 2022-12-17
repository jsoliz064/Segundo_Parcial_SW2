const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const fileUpload = require('express-fileupload');
const dbConnection = require('../models/index');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth: '/api/auth',
            users: '/api/users',
            posts: '/api/posts',
            categories: '/api/categories',
            paypal: '/api/paypal',
            subscriptions: '/api/subscriptions',
        }

        this.conectarDB();
        this.middlewares();
        this.routes();
    }

    async conectarDB() {
        dbConnection.sequelize.sync()
            .then(() => {
                console.log("Synced db.");
            })
            .catch((err) => {
                console.log("Failed to sync db: " + err.message);
            });
    }


    middlewares() {
        // this.app.use(cors({ origin: `http://localhost:${this.port}` }));
        this.app.use(cors());

        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use(express.static('public'));
        this.app.use(fileUpload({
            useTempFiles: false,
            tempFileDir: '/tmp/',
            createParentPath: false,
        }));
    }

    routes() {
        this.app.use(this.paths.users, require('../routes/userRoutes'));
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.categories, require('../routes/categoriesRoutes'));
        this.app.use(this.paths.posts, require('../routes/postsRoutes'));
        this.app.use(this.paths.paypal, require('../routes/paypalRoutes'));
        this.app.use(this.paths.subscriptions, require('../routes/subscriptionsRoutes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en: http://localhost:${this.port}`);
        });
    }

}




module.exports = Server;
