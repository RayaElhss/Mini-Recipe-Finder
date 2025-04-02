// 1. Get the input field and button
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const loader = document.getElementById("loader");


// 2. Add a click event to the button
searchBtn.addEventListener("click", async () => {
    // 3. Get the value from the input
    const query = searchInput.value.trim();

    // 4. If it's empty alert the user
    if (!query) {
        alert("Please enter an ingredient!");
        return;
    }

    resultsContainer.innerHTML = "";
    loader.style.display = "block";

    // 5. Build the API URL using the query
    const apiURL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

    try {
        // 6. Fetch data from the API
        const response = await fetch(apiURL);
        const data = await response.json();

        loader.style.display = "none";

        const resultsContainer = document.getElementById("resultsContainer");

        // clear previous results
        resultsContainer.innerHTML = "";

        // If no meals found
        if (!data.meals) {
            resultsContainer.innerHTML = `
            <p style="color: black; font-weight:bold; font-size: 2rem; text-align: center;">No recipies found. Try
            a different ingredient.</p>
            `;
            loader.style.display = "none";

            return;
        }

        // loop through meals and display them
        data.meals.forEach(meal => {
            const card = document.createElement("div");
            card.classList.add("recipe-card");

            card.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
            <a href="${meal.strSource || '#'}" target="_blank">View Recipe</a>
            `;

            resultsContainer.appendChild(card);
        });


        //7. Log the result to see what we got
        console.log(data);

    } catch (error) {
        console.error("Error fetching recipes:", error);
    }
});
