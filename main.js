async function fetchMovies() {
  const apiUrl =
    "https://api.themoviedb.org/3/movie/popular?api_key=d4f9e0502356d1d0ce1ae299c5217299";

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    renderMovies(data.results);
    setupSearch(data.results);
  } catch (error) {
    console.error("Error fetching popular movies:", error);
  }
}

function setupSearch(movies) {
  const searchInput = document.getElementById("searchInput");

  searchInput.addEventListener("input", (event) => {
    const searchTerm = event.target.value.toLowerCase();

    if (searchTerm === "") {
      renderMovies([]);
      return;
    }

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
    movieCard.classList.add("bg-white", "rounded-lg", "shadow-md", "p-4");

    movieCard.innerHTML = `
      <img class="w-full h-[300px] object-cover rounded" src="https://image.tmdb.org/t/p/w500${
        movie.poster_path
      }" alt="${movie.title}" />
      <h2 class="mt-2 text-lg font-semibold">${movie.title}</h2>
      <p class="text-sm text-gray-600">${movie.overview.substring(0, 100)}...</p>
      <button class="mt-2 bg-gray-500 text-white px-3 py-1 rounded hover:bg-blue-600 add-fav-btn">
        Add to Favorites
      </button>
    `;

    
    const favButton = movieCard.querySelector(".add-fav-btn");
    favButton.addEventListener("click", () => addToFavorite(movie));

    movieList.appendChild(movieCard);
  });
}

const favMovies = JSON.parse(localStorage.getItem('favMvoiesList')) || [];

function addToFavorite(movie){
  const isAlreadyExisting = favMovies.some((mov) => mov.id === movie.id);
  if (!isAlreadyExisting){
    favMovies.unshift(movie);
    saveToStorage();
    alert(`${movie.title} added to favorites.`);
  } else {
    alert(`${movie.title} is already in favorites.`);
  }
}

function saveToStorage(){
  localStorage.setItem('favMvoiesList', JSON.stringify(favMovies));
}



fetchMovies();
