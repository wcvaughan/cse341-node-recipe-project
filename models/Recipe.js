const mongoose = require('mognoose');


// Define Recipe schema
const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ingredients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredient',
        required: true
    }],
    steps: [{ 
        type: String, 
        required: true 
    }],
    prep_time: {
        type: Number,
        required: true
    },
    cooking_time: {
        type: Number,
        required: true
    },
    difficulty: {
        type: String
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true 
    },
});

// Create Recipe model
const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;