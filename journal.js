const favMovies = JSON.parse(localStorage.getItem("favMvoiesList")) || [];

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
    <input placeholder = "Enter personal note"/>
    `;
    favMoviesElement.appendChild(movieCard);
  });
}

function addToFavorite(movie) {
  const isAlreadyExisting = favMovies.some((mov) => mov.title === movie.title);
  if (!isAlreadyExisting) {
    favMovies.unshift(movie);
    saveToStorage();
    alert(`${movie.title} is added to Favorite list`);
  } else alert(`${movie.title} is already exists to Favorite list`);
}
