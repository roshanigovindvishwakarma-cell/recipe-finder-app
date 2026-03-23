const recipes = [
    {name: "Pasta", category: "Lunch"},
    {name: "Pancakes", category: "Breakfast"},
    {name: "Biryani", category: "Dinner"},
    {name: "Sandwich", category: "Breakfast"},
    {name: "Burger", category: "Lunch"},
    {name: "Pizza", category: "Dinner"},
    {name: "Salad", category: "Lunch"},
    {name: "Omelette", category: "Breakfast"},
    {name: "Fried Rice", category: "Dinner"},
    {name: "Noodles", category: "Lunch"}
];

let favorites = [];

function displayRecipes(list) {
    const container = document.getElementById("recipes");
    container.innerHTML = "";

    if (list.length === 0) {
        container.innerHTML = "<p>No results found</p>";
        return;
    }

    list.forEach(recipe => {
        container.innerHTML += `
            <div class="card">
                <h3>${recipe.name}</h3>
                <p>${recipe.category}</p>
                <button onclick="addToFavorites('${recipe.name}')">❤️ Add</button>
            </div>
        `;
    });
}

function addToFavorites(name) {
    favorites.push(name);
    displayFavorites();
}

function displayFavorites() {
    const container = document.getElementById("favorites");
    container.innerHTML = "";

    favorites.forEach(fav => {
        container.innerHTML += `<div class="card">${fav}</div>`;
    });
}

function filterCategory(category) {
    if (category === "All") {
        displayRecipes(recipes);
    } else {
        displayRecipes(recipes.filter(r => r.category === category));
    }
}

document.getElementById("search").addEventListener("input", function() {
    const value = this.value.toLowerCase();
    const filtered = recipes.filter(r => r.name.toLowerCase().includes(value));
    displayRecipes(filtered);
});

displayRecipes(recipes);
