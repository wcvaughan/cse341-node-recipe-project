const mongodb = require('../db/connect');

const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    //#swagger.tags=['Recipes']
    try {
        const result = await mongodb.getDatabase().db().collection('recipes').find().toArray();
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

const getSingle = async (req, res, next) => {
    //#swagger.tags=['Recipes']
    try {
        const recipeName = req.params.name; // Get recipe name from URL params

        // Find recipe by name
        const recipe = await Recipe.findOne({ name: recipeName });

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        return res.status(200).json(recipe);
    } catch (err) {
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
};


const createRecipe = async (req, res, next) => {
    //#swagger.tags=['Recipes']

    // Get the logged-in user from the session (Passport adds this)
    const user = req.user;

    if (!user) {
        return res.status(401).json({ error: 'User is not authenticated.' });
    }

    try {
        const recipe = {
            name: req.body.name,
            description: req.body.description,
            ingredients: req.body.ingredients,
            steps: req.body.steps,
            prep_time: req.body.prep_time,
            cooking_time: req.body.cooking_time,
            difficulty: req.body.difficulty,
            created_by: user._id
        };
        const response = await mongodb.getDatabase().db().collection('recipes').insertOne(recipe);
        if (response.acknowledged) {
            res.status(201).json({ message: 'Recipe added successfully' });
        } else {
            throw new Error('Failed to add Recipe');
        }
    } catch (err) {
        next(err);
    }
};

const updateRecipe = async (req, res, next) => {
    //#swagger.tags=['Recipes']

    const recipeName = req.params.name; // Get recipe name from URL params

    if (!recipeName) {
        return res.status(400).json({ error: 'Recipe name required' });
    }

    // Get the logged-in user from the session (Passport adds this)
    const user = req.user;

    if (!user) {
        return res.status(401).json({ error: 'User is not authenticated.' });
    }

    try {
        // Prepare recipe data from request body
        const recipe = {
            name: req.body.name,
            description: req.body.description,
            ingredients: req.body.ingredients,
            steps: req.body.steps,
            prep_time: req.body.prep_time,
            cooking_time: req.body.cooking_time,
            difficulty: req.body.difficulty,
            created_by: user._id
        };

        const response = await mongodb.getDatabase().db().collection('recipes').updateOne(
            { name: recipeName }, // Find by name
            { $set: recipe} // Update fields
        );

        // Check if the update was successful
        if (response.modifiedCount > 0 ) {
            res.status(200).json({ message: 'Recipe updated successfully '});
        } else {
            res.status(500).json({ error: 'Recipe not found or no change made '});
        }
    } catch (err) {
        next(err);
    }
};

const deleteRecipe = async (req, res, next) => {
    //#swagger.tags=['Recipes']

    try {
        const recipeName = req.params.name; // Grab recipe name from URL params

        // Find and delete the recipe by name
        const recipe = await Recipe.findOneAndDelete({ name: recipeName });

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found '});
        }
        
        return res.status(200).json({ message: 'Recipe deleted successfully' });
    } catch (err) {
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createRecipe,
    updateRecipe,
    deleteRecipe
};