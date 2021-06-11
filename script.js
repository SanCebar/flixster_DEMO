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
const moviesDisplay = document.querySelector(".grid-container");
let page = 1;

const movieForm = document.querySelector("form");
const loadMoreButton = document.querySelector("#load-more");
const toTopButton = document.querySelector("#to-top");
const popUpDisplay = document.querySelector(".pop-up");

//remove horizontal scroll bar
//document.documentElement.style.overflowX = 'hidden';

/* Event Handlers */
movieForm.addEventListener("submit", handleSearch);
//movieForm.addEventListener("input", handleSearch); //make search results appear as they're typed
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
    let posterSize = "w185"; //alt sizes: w154, w185, w200, w342, w500, w780, original 
    data.forEach(element => {
        moviesDisplay.innerHTML += `
            <div class="grid-item"> 
                <button class="popUpBtn" onclick="popUp(this);">
                <img class="movie-poster" src="http://image.tmdb.org/t/p/${posterSize}${element.poster_path}" alt="Movie Poster for ${element.title}">
                <h3 class="movie-title hidden">${element.original_title}</h3>
                <h4 class="movie-lang hidden"> ${element.original_language} </h4>
                <h4 class="vote-count hidden"> ${element.vote_count} </h4>
                <p class="movie-overview hidden">${element.overview}</p>
                </button>
                
                <section class="below-poster-info">
                    <h4 class="title">${element.title}</h4>
                    <h4>⭐ ${element.vote_average}<h4>
                </section>
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
    loadMoreButton.classList.add("hidden");
    toTopButton.classList.add("hidden");


    //moviesDisplay Movies
    moviesDisplay.innerHTML = ``;
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
    getMovies();
}

window.onload = function () {
    // run your function here to make it execute as soon as the page loads
    page =  1;
    getMovies();
}

/* Additional Features */

function popUp (el) {
    console.log(el);
    if (popUpDisplay.classList.contains("hidden")) {
        popUpDisplay.classList.remove("hidden");
    } else {
        popUpDisplay.classList.add("hidden");
    }

    //gather movie info
    let poster = el.querySelector("img").src;
    let title = el.querySelector(".movie-title").innerHTML;
    let movie_lang = el.querySelector(".movie-lang").innerHTML;
    let votes = el.querySelector(".vote-count").innerHTML;
    let overview = el.querySelector(".movie-overview").innerHTML;
    
    popUpDisplay.innerHTML = `
        <img src="${poster}">
        <h2>${title}</h2>
        <h3>Original Language: ${movie_lang}</h3>
        <h3>Vote Count: ${votes}</h3>
        <p>${overview}</p>
    `
}