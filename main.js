async function fetchMovies() {
  const apiUrl =
    "https://api.themoviedb.org/3/movie/popular?api_key=d4f9e0502356d1d0ce1ae299c5217299";

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
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
      <p class="text-sm text-gray-600">${movie.overview.substring(
        0,
        100
      )}...</p>
  `;

    movieList.appendChild(movieCard);
  });
}

fetchMovies();
