/* Global Variables */
const api_key = "fde7bb13d16debd8e524a7bccdaf1b03";
const display = document.querySelector(".grid-container");

// 1. Populate screen with movies
//      - make API call
// 2. Search functionality

const grid_item_1 = document.querySelector(".grid-item-1");

async function getMovies () {
    console.log("Inside getResults...");
    const apiUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=en-US`;

    //go to movie API
    const response = await fetch(apiUrl);
    const responseData = await response.json();
    const data = responseData.data;
    console.log("Data retreived!");
    console.log(data);

    //display movies
    displayMovies(data);
}

function displayMovies(data) {
    data.forEach(element => {
        display.innerHTML += `
            <div class="grid-item"> 
                <h4>${element.title}</h4>
            </div>
        `
    }); 
}

window.onload = function () {
  // run your function here to make it execute as soon as the page loads
  getMovies();
}




/* Additional Features */
// let popUp = () => {
//     //logic
// }

// /* wait for click to create pop-up window */
// grid_item_1.addEventListener("click", popUp);