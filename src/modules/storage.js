// src/modules/storage.js
export let favMovies = JSON.parse(localStorage.getItem("favMoviesList")) || [];

export function saveToStorage(movies) {
  try {
    localStorage.setItem("favMoviesList", JSON.stringify(movies));
  } catch (error) {
    console.error("Error while saving to localStorage", error);
  }
}

export function addToFavorite(movie) {
  const isAlreadyExisting = favMovies.some((mov) => mov.id === movie.id);
  if (!isAlreadyExisting) {
    favMovies.unshift(movie);
    saveToStorage(favMovies);
    alert(`${movie.title} added to favorites.`);
  } else {
    alert(`${movie.title} is already in favorites.`);
  }
}
