const express = require('express');
const router = express.Router();
const { getAll, getSingle, createIngredient, updateIngredient, deleteIngredient } = require('../controllers/ingredients');
const { validateIngredients } = require('../middleware/validation');
const { validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Ingredient controller actions
router.get('/', getAll);
router.get('/ingredients/:name', getSingle);
router.post('/', validateIngredients, handleValidationErrors, createIngredient);
router.put('/ingredients/:name', validateIngredients, handleValidationErrors, updateIngredient);
router.delete('/ingredients/:name', handleValidationErrors, deleteIngredient);

module.exports = router;