// Base URL for API requests (adjust as needed)
const apiUrl = 'http://localhost:8080';  // Adjust if needed

// Function to fetch and display all recipes
async function fetchRecipes() {
    const response = await fetch(`${apiUrl}/recipes`);
    const recipes = await response.json();

    const recipeList = document.getElementById('recipe-list');
    recipes.forEach(recipe => {
        const recipeItem = document.createElement('div');
        recipeItem.classList.add('recipe-item');
        recipeItem.innerHTML = `<h3>${recipe.name}</h3><p>${recipe.description}</p><p>${recipe.steps}</p>`;
        recipeList.appendChild(recipeItem);
    });
}

// Function to add a new recipe
async function addRecipe(event) {
    event.preventDefault();

    const recipeData = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        steps: document.getElementById('steps').value
    };

    const response = await fetch(`${apiUrl}/recipes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipeData)
    });

    if (response.ok) {
        alert('Recipe added!');
        fetchRecipes();  // Reload recipes list
    } else {
        alert('Failed to add recipe.');
    }
}

// Function to fetch and display all ingredients
async function fetchIngredients() {
    const response = await fetch(`${apiUrl}/ingredients`);
    const ingredients = await response.json();

    const ingredientList = document.getElementById('ingredient-list');
    ingredients.forEach(ingredient => {
        const ingredientItem = document.createElement('div');
        ingredientItem.classList.add('ingredient-item');
        ingredientItem.innerHTML = `<h3>${ingredient.name}</h3><p>Category: ${ingredient.category}</p><p>Calories: ${ingredient.calories_per_unit}</p>`;
        ingredientList.appendChild(ingredientItem);
    });
}

// Function to add a new ingredient
async function addIngredient(event) {
    event.preventDefault();

    const ingredientData = {
        name: document.getElementById('ingredient-name').value,
        category: document.getElementById('category').value,
        measurement_unit: document.getElementById('measurement-unit').value,
        calories_per_unit: document.getElementById('calories').value,
        notes: document.getElementById('notes').value
    };

    const response = await fetch(`${apiUrl}/ingredients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ingredientData)
    });

    if (response.ok) {
        alert('Ingredient added!');
        fetchIngredients();  // Reload ingredients list
    } else {
        alert('Failed to add ingredient.');
    }
}

// Initialize page based on URL
if (document.getElementById('recipe-list')) {
    fetchRecipes();
}

if (document.getElementById('ingredient-list')) {
    fetchIngredients();
}

// Set up event listeners
if (document.getElementById('recipe-form')) {
    document.getElementById('recipe-form').addEventListener('submit', addRecipe);
}

if (document.getElementById('ingredient-form')) {
    document.getElementById('ingredient-form').addEventListener('submit', addIngredient);
}
