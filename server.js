const express = require('express');
const session = require('express-session');
const crypto = require('crypto');
require('dotenv').config();
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const ingredientRoutes = require('./routes/ingredient-routes');
const recipeRoutes = require('./routes/recipe-routes');
const userRoutes = require('./routes/user-routes');
const errorHandler = require('./middleware/errorhandler');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const port = process.env.PORT || 8080;

// Session setup
const sessionSecret = crypto.randomBytes(64).toString('hex');

app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' } // make sure the cookie is secure in production
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware
app
    .use(bodyParser.json()) // Parse JSON request bodies
    .use((req, res, next) => { // Handle Cors
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
        );
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        next();
    })
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)) // Swagger API docs
    .use('/auth', authRoutes) // Authentication routes (OAuth)
    .use('/ingredients', ingredientRoutes) // Ingredient routes
    .use('/recipes', recipeRoutes) // Recipe routes
    .use('/users', userRoutes); // User routes

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception ${err}\n` + `Exception origin: ${origin}`);
});

// Use authentication routes
app.use('/auth', authRoutes);

// Global error handler
app.use(errorHandler);

// Initialize the database and start the server
mongodb.initDb((err, db) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Listening and running at port ${port}`);
        });;
    }
});