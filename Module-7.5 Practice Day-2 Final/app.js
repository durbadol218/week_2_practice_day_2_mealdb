// Display Searched Meal's Info!
const createMealInfo = (meal,mealInput) => {
    const mealPhoto = meal.strMealThumb;
    const mealName = meal.strMeal;
    const mealInformation = `
    <a href="#meal-details-section" style = "text-decoration: none; color:black;">
        <div onclick="getMealDetails(${meal.idMeal})" class="card border-0 shadow cursor" style="width:18rem; border-radius:10px;">
            <img src = "${mealPhoto}" class="card-img-top img-fluid" style="width:18rem; border-radius:10px 10px 0 0" alt="${mealName}'s photo";/>
            <div class="card-body">
                <h5 class="card-title text-center">${mealName}</h5>
                <h5 class="card-title text-center text-success">Category: ${meal.strCategory}</h5>
            </div>
        </div>
    </a>
    `
    const searchedMeal = document.getElementById('searched-meal-info');
    const mealInfoDiv = document.createElement('div');
    mealInfoDiv.className = 'searched-mealInfo-subclass col-xm-4 col-sm-3 col-md-3 p-3 d-flex justify-content-center';
    mealInfoDiv.innerHTML =mealInformation;
    searchedMeal.appendChild(mealInfoDiv);
};

const showMealInfoDiv = (data,mealInput) => {
    const meal = data.meals;
    if(meal)
    {
        meal.forEach(element => {
            createMealInfo(element,mealInput);
        })
    }
    else
    {
        const foundMealInfo = document.getElementById('mealNotFound');
        foundMealInfo.innerText = `No meal found for this ${mealInput}!`;
    }
};

const searchMeal = () => {
    const mealInput = document.getElementById('meal-input').value;

    if (mealInput) {
        // Clear the No Meal Found Tag For Every Single New Search
        const noMealFound = document.getElementById('mealNotFound');
        noMealFound.innerText = ``;

        // Clear the Meal Info Section For Every Single New Search
        const searchedmealInfo = document.getElementById('searched-meal-info');
        searchedmealInfo.innerHTML = ``;

        // Clear the Meal Details Section For Every Single New Search
        const mealDetailsSection = document.getElementById('meal-details-section');
        mealDetailsSection.innerHTML = ``;

        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s= ${mealInput}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                showMealInfoDiv(data, mealInput);
                // console.log(data);
            })
    }
    else {
        const noMealFound = document.getElementById('mealNotFound');
        noMealFound.innerText = `You haven't entered anything!`;
    }
}

document.getElementById('meal-submit').addEventListener('click',searchMeal);


// Meal Details Display Section
const showMealDetails = data => {
    const meal=data.meals[0];
    const mealPhoto = meal.strMealThumb;
    const mealName = meal.strMeal;

    const mealDetailsSection = document.getElementById('meal-details-section');
    mealDetailsSection.innerHTML = `
        <div id="meal-details" class="card border-0 shadow col-xm-12 col-sm-12 col-md-6" style="border-radius: 10px; width: 19.5rem;">
                <img src="${mealPhoto}" class="card-img-top" style="width: 18rem; border-radius: 10px 10px 0 0" alt="...">
                <div class="card-body">
                    <h3 class="card-title text-center my-1">${mealName}</h3>
                    <h5 class="card-title text-center text-success">Category: ${meal.strCategory} </h5>
                    <hr>
                    <p class="card-text">${meal.strInstructions.slice(0, 248)}</p>
                    <div id="meal-ingredients"></div>
                </div>
            </div>
    `
    const mealIngredients = document.getElementById('meal-ingredients');
}

// For onclick() in the div section!
const getMealDetails = mealID => {
    const mealDetailsSection = document.getElementById('meal-details-section');
    mealDetailsSection.innerHTML = ``;

    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
    fetch(url)
        .then(response => response.json())
        .then(data => showMealDetails(data));
}