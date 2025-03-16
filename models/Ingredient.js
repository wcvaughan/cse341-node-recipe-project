const mongoose = require('mongoose');

// Define Ingredient schema

const ingredientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    measurement_unit: {
        type: String,
        required: true
    },
    calories_per_unit: {
        type: Number,
        required: true
    },
    notes: {
        type: String
    }
});

// Create Ingredient model
const Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = Ingredient;