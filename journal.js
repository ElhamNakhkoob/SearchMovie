/**
 * @fileoverview
 * Handles rendering and managing the user's favorite movies list,
 * including saving to and loading from localStorage.
 */

/**
 * The list of favorite movies, loaded from localStorage if available.
 * @type {Array<Object>}
 */
const favMovies = JSON.parse(localStorage.getItem("favMvoiesList")) || [];

/**
 * Renders the favorite movies to the DOM.
 * Each movie card displays poster, title, overview, and a note input.
 *
 * @function
 * @returns {void}
 */
function renderFavMovies() {
  const favMoviesElement = document.getElementById("favMovies");
  favMoviesElement.innerHTML = "";

  favMovies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("bg-white", "rounded-lg", "shadow-md", "p-4");
    movieCard.innerHTML = `
      <img class="w-full h-[300px] object-cover rounded" src="https://image.tmdb.org/t/p/w500/${
        movie.poster_path
      }" 
        alt="${movie.title}"/>
      <h2 class="mt-2 text-lg font-semibold">${
        movie.title.charAt(0).toUpperCase() + movie.title.slice(1)
      }</h2>
      <p class="text-gray-500 text-md">${movie.overview.substring(0, 100)}..</p>
      <input placeholder="Enter personal note"/>
    `;
    favMoviesElement.appendChild(movieCard);
  });
}

/**
 * Adds a movie to the favorites list if it is not already present.
 * Updates localStorage and notifies the user.
 *
 * @param {Object} movie - The movie object to add. Should have at least a 'title' property.
 */
function addToFavorite(movie) {
  // Check if the movie is already in the favorites list by comparing titles
  const isAlreadyExisting = favMovies.some((mov) => mov.title === movie.title);
  if (!isAlreadyExisting) {
    favMovies.unshift(movie);
    saveToStorage();
    alert(`${movie.title} is added to Favorite list`);
  } else {
    alert(`${movie.title} is already exists to Favorite list`);
  }
}

/**
 * Saves the current favorites list to localStorage.
 *
 * @function
 * @returns {void}
 */
function saveToStorage() {
  localStorage.setItem("favMvoiesList", JSON.stringify(favMovies));
}
