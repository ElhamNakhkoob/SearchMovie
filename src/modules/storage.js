// src/modules/storage.js
export let favMovies = JSON.parse(localStorage.getItem("favMoviesList")) || [];

export function saveToStorage(movies) {
  localStorage.setItem("favMoviesList", JSON.stringify(movies));
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
