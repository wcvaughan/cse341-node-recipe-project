const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

router.use('/api-docs', swaggerUi.serve);
router.use('/api-docs', swaggerUi.setup(swaggerDocument));

router.use('/auth', require('./auth-routes'));
router.use('/ingredient', require('./ingredient-routes'));
router.use('/recipe', require('./recipe-routes'));
router.use('/user', require('./user-routes'));

module.exports = router;