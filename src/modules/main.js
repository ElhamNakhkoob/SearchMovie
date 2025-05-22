// src/modules/main.js
import { addToFavorite } from "./storage.js";

async function fetchMovies() {
  const apiUrl =
    "https://api.themoviedb.org/3/movie/popular?api_key=d4f9e0502356d1d0ce1ae299c5217299";

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      alert(
        `Sorry, we couldn't load the movies. Error-Status: ${response.status} Please try again later.`
      );
      throw new Error(`Something went wrong, status: ${response.status}`);
    }
    const data = await response.json();
    renderMovies(data.results);
    setupSearch(data.results);
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    alert("Please try again later.");
  }
}

function setupSearch(movies) {
  if (!movies) {
    console.warn("movie is missing");
    return;
  }
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm)
    );
    renderMovies(filteredMovies);
  });
}

function renderMovies(movies) {
  const movieList = document.getElementById("movieList");
  movieList.innerHTML = "";

  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.className = "bg-white rounded-lg shadow-md p-4";
    movieCard.innerHTML = `
      <img class="w-full h-[300px] object-cover rounded" src="https://image.tmdb.org/t/p/w500${
        movie.poster_path
      }" alt="${movie.title}" />
      <h2 class="mt-2 text-lg font-semibold">${movie.title}</h2>
      <p class="text-sm text-gray-600">${movie.overview.substring(
        0,
        100
      )}...</p>
      <button class="mt-2 bg-gray-500 text-white px-3 py-1 rounded hover:bg-blue-600 add-fav-btn">
        Add to Favorites
      </button>
    `;

    const favButton = movieCard.querySelector(".add-fav-btn");
    favButton.addEventListener("click", () => addToFavorite(movie));

    movieList.appendChild(movieCard);
  });
}

fetchMovies();
