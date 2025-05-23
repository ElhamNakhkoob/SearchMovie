// src/modules/storage.js

/**
 * @module storage
 * Handles favorite movies storage using browser localStorage.
 */

/**
 * The list of favorite movies, loaded from localStorage if available.
 * @type {Array<Object>}
 */
export let favMovies = JSON.parse(localStorage.getItem("favMoviesList")) || [];

/**
 * Saves the given movies array to localStorage under the key "favMoviesList".
 * Handles errors gracefully and logs them to the console.
 *
 * @param {Array<Object>} movies - The array of movie objects to save.
 */
export function saveToStorage(movies) {
  try {
    localStorage.setItem("favMoviesList", JSON.stringify(movies));
  } catch (error) {
    console.error("Error while saving to localStorage", error);
  }
}

/**
 * Adds a movie to the favorites list if it is not already present.
 * Updates localStorage and notifies the user.
 *
 * @param {Object} movie - The movie object to add. Should have at least an 'id' and 'title' property.
 */
export function addToFavorite(movie) {
  // Check if the movie is already in the favorites list by comparing IDs
  const isAlreadyExisting = favMovies.some((mov) => mov.id === movie.id);
  if (!isAlreadyExisting) {
    // Add the new movie to the beginning of the array
    favMovies.unshift(movie);
    // Persist the updated list to localStorage
    saveToStorage(favMovies);
    // Notify the user
    alert(`${movie.title} added to favorites.`);
  } else {
    // Notify the user if the movie is already in favorites
    alert(`${movie.title} is already in favorites.`);
  }
}
