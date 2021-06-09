/**
 * Author: Robert Velasco
 * Date: 06/11/2021
 * 
 * Description:
 */

// 1. Populate screen with movies
//      - make API call
// 2. Search functionality

/* Global Variables */
const api_key = "fde7bb13d16debd8e524a7bccdaf1b03";
const display = document.querySelector(".grid-container");
const movieForm = document.querySelector("form");

/* Event Handlers */
movieForm.addEventListener("submit", handleSearch);


/**
 * getMovies - retrieves array of objects from API
 */
async function getMovies () {
    console.log("Inside getResults...");
    const apiUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=en-US`;

    //go to movie API
    const response = await fetch(apiUrl);
    const responseData = await response.json();
    const data = responseData.results;
    console.log(responseData);
    console.log(data);

    //display movies
    displayMovies(data);
}

/**
 * displayMovies - displays three different pieces of information for each 
 *                 movie: poster, title, votes
 * 
 * @param {*} data 
 */
function displayMovies(data) {
    data.forEach(element => {
        display.innerHTML += `
            <div class="grid-item"> 
                <img src="http://image.tmdb.org/t/p/w185${element.poster_path}" alt="Movie Poster for ${element.title}">
                <h4>${element.title}</h4>
                <h5>Votes: ${element.vote_count}<h5>
            </div>
        `
    }); 
}

function handleSearch (event) {
    event.preventDefault();
    console.log("Inside handleSearch...")
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