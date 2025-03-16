const express = require('express');
const router = express.Router();
const { getAll, getSingle, createRecipe, updateRecipe, deleteRecipe } = require('../controllers/recipes');
const { validateRecipes } = require('../middleware/validation');
const { validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Recipe controller actions
router.get('/', getAll);
router.get('/recipes/:name', getSingle);
router.post('/', validateRecipes, handleValidationErrors, createRecipe);
router.put('/recipes/:name', validateRecipes, handleValidationErrors, updateRecipe);
router.delete('/recipes/:name', handleValidationErrors, deleteRecipe);

module.exports = router;