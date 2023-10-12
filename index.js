//Libraries
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

//Routes
const user = require('./routes/user.route');
const userProducts = require('./routes/user-products.route');
const product = require('./routes/product.route');

//Swagger
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger');

const app = express();

//Connect to Database
mongoose.connect(process.env.MONGO_URI)
    .then(
        () => { console.log("Connection with database established")},
        err => { console.log("Failed to connect to MongoDB", err)}
    );

// -- Middlewares--
//Files
app.use('/', express.static('files'));

//general
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors({
    origin: '*'
}));

// Routing
app.use('/api/users', user);
app.use('/api/users-products', userProducts);

//Swagger
app.use('/api-docs',
swaggerUI.serve,
swaggerUI.setup(swaggerDocument.options));

module.exports = app;