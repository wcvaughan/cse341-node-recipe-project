const mongodb = require('../db/connect');

const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    //#swagger.tags=['Ingredients']
    try {
        const result = await mongodb.getDatabase().db().collection('ingredients').find().toArray();
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

const getSingle = async (req, res, next) => {
    //#swagger.tags=['Ingredients']
    try {
        const ingredientName = req.params.name; // Get name of ingredient from URL params

        // Find by name
        const ingredient = await Ingredient.findOne({ name: ingredientName });

        if (!ingredient) {
            return res.status(404).json({ message: 'Ingredient not found '});
        }

        return res.status(200).json(ingredient);
    } catch (err) {
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const createIngredient = async (req, res, next) => {
    //#swagger.tags=['Ingredients']
    
    // Get the logged-in user from the session (Passport adds this)
    const user = req.user;

    if (!user) {
        return res.status(401).json({ error: 'User is not authenticated.' });
    }

    try {
        const ingredient = {
            name: req.body.name,
            category: req.body.category,
            measurement_unit: req.body.measurement_unit,
            calories_per_unit: req.body.calories_per_unit,
            notes: req.body.notes
        };
        const response = await mongodb.getDatabase().db().collection('ingredients').insertOne(ingredient);
        if (response.acknowledged) {
            res.status(201).json({ message: 'Ingredient added successfully' });
        } else {
            throw new Error('Failed to add ingredient');
        }
    } catch (err) {
        next(err);
    }
};

const updateIngredient = async (req, res, next) => {
    //#swagger.tags=['Ingredients']
    
    const ingredientName = req.params.name; // Get ingredient name from URL params

    if (!ingredientName) {
        return res.status(400).json({ error: 'Ingredient name is required'});
    }

    // Get the logged-in user from the session (Passport adds this)
    const user = req.user;

    if (!user) {
        return res.status(401).json({ error: 'User is not authenticated.' });
    }


    try {
        // Prepare ingredient data from the request body
        const ingredient = {
            name: req.body.name,
            category: req.body.category,
            measurement_unit: req.body.measurement_unit,
            calories_per_unit: req.body.calories_per_unit,
            notes: req.body.notes
        };

        // Find and update the ingredient by its name
        const response = await mongodb.getDatabase().db().collection('ingredients').updateOne(
            { name: ingredientName }, // Find by name
            { $set: ingredient } // Update fields
        );

        // Check if the update was successful
        if (response.modifiedCount > 0 ) {
            res.status(200).json({ message: 'Ingredient updated successfully '});
        } else {
            res.status(500).json({ error: 'Ingredient not found or no change made '});
        }
    } catch (err) {
        next(err);
    }
};

const deleteIngredient = async (req, res, next) => {
    //#swagger.tags=['Ingredients']
    try {
        const ingredientName = req.params.name; // Grab ingredient name from URL params

        // Find and delete ingredient by name
        const ingredient = await Recipe.findOneAndDelete({ name: ingredientName });

        if (!ingredient) {
            return res.status(404).json({ message: 'Ingredient not found '});
        }

        return res.status(200).json({ message: 'Ingredient deleted successfully '});
    } catch (err) {
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createIngredient,
    updateIngredient,
    deleteIngredient
};