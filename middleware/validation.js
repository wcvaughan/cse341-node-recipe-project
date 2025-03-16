const { body, param } = require('express-validator');

const validateIngredients = [
    body('name').trim().isString().isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),
    body('category').trim().isString().isLength({ min: 2 }).withMessage('Category must be at least 2 characters long'),
    body('measurement_unit').trim().isString().isLength({ min: 2 }).withMessage('Measurement unit must be at least 2 characters long'),
    body('calories_per_unit').isFloat({ min: 0.01 }).withMessage('Calories per unit must be a valid amount greater than 0'),
    body('notes').optional()
];

const validateRecipes = [
    body('name').trim().isString().isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),
    body('description').trim().isString().isLength({ min: 10 }).withMessage('Description must be at least 10 characters long'),
    body('ingredients'),
    body('steps').trim().isString().isLength({ min: 10 }).withMessage('Steps must be at least 10 characters long'),
    body('prep_time').isInt({ min: 0 }).withMessage('Prep time must be greater than 0'),
    body('cooking_time').isInt({ min: 0 }).withMessage('Cooking time must be greater than 0'),
    body('difficult').optional(),
    body('created_by').isMongoId().withMessage('Invalid user ID format')
];

const validateUsers = [
    body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    body('email').normalizeEmail().isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at leaset 6 characters long'),
    body('role').optional().isIn(['admin', 'user', 'moderator']).withMessage('Invalid role'),
];

module.exports = {
    validateIngredients,
    validateRecipes,
    validateUsers
};