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
let page = 1;

const movieForm = document.querySelector("form");
const loadMoreButton = document.querySelector("#load-more");
const toTopButton = document.querySelector("#to-top");

/* Event Handlers */
movieForm.addEventListener("submit", handleSearch);
loadMoreButton.addEventListener("click", loadMoreMovies);


/**
 * getMovies - retrieves array of objects from API
 */
async function getMovies () {
    console.log("Inside getMovies...");
    console.log("page number ---->", page);

    let apiUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=en-US&page=${page}`;
    //go to movie API
    const response = await fetch(apiUrl);
    const responseData = await response.json();
    const data = responseData.results;
    console.log(responseData);
    console.log(data);

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
                <img src="http://image.tmdb.org/t/p/w200${element.poster_path}" alt="Movie Poster for ${element.title}">
                <h4>${element.title}</h4>
                <h5>Votes: ${element.vote_count}<h5>
            </div>
        `
    }); 
}

/**
 * handleSearch - activated by a search submission
 *                calls search API
 * 
 * @param {*} event 
 */
async function handleSearch (event) {
    console.log("Inside handleSearch...");
    
    event.preventDefault();
    page = 1;
    const searchTerm = event.target.searchForm.value;
    const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&api_key=${api_key}&language=en-US&page=${page}`;

    //go to movie search API
    const response = await fetch(searchUrl);
    const responseData = await response.json();
    const data = responseData.results;
    console.log(responseData);
    console.log(data);

    //modify bottom screen  buttons
    loadMoreButton.classList.add("searchScreen");
    toTopButton.classList.add("hidden");


    //display Movies
    display.innerHTML = ``;
    event.target.searchForm.value = '';
    displayMovies(data);
}

/**
 * loadMoreMovie - activated by a click on the load more movies button
 *                 updates global variable page then calls getMovies
 * 
 * @param {*} event 
 */
function loadMoreMovies (event) {
    console.log("Inside loadMoreMovies...");
    page++;
    if (loadMoreButton.classList.contains("searchScreen")) {
        getMovies();
    } else {
        getMovies();
    } 
}


window.onload = function () {
  // run your function here to make it execute as soon as the page loads
  page =  1;
  getMovies();
}


/* Additional Features */
// let popUp = () => {
//     //logic
// }

// /* wait for click to create pop-up window */
// grid_item_1.addEventListener("click", popUp);