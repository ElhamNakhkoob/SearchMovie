import { favMovies, saveToStorage } from "./storage.js";

function renderFavMovies() {
  const favMoviesElement = document.getElementById("favMovies");
  favMoviesElement.innerHTML = "";

  favMovies.forEach((movie) => {
    if (!movie) {
      console.warn("movie is missing");
      return;
    }
    const movieCard = document.createElement("div");
    movieCard.className = "bg-white rounded-lg shadow-md p-4";
    movieCard.innerHTML = `
      <img class="w-full h-[300px] object-cover rounded" src="https://image.tmdb.org/t/p/w500/${
        movie.poster_path
      }" alt="${movie.title}" />
      <h2 class="mt-2 text-lg font-semibold">${movie.title}</h2>
      <p class="text-gray-500 text-md">${movie.overview.substring(0, 100)}..</p>
    `;

    addNotesToCard(movieCard, movie);
    favMoviesElement.appendChild(movieCard);
  });
}

function addNotesToCard(card, movie) {
  const noteLabel = document.createElement("p");
  noteLabel.textContent = "Personal Note:";
  noteLabel.className = "mt-2 text-sm font-medium";

  const noteInput = document.createElement("textarea");
  noteInput.className = "w-full border rounded p-2 mt-1";
  noteInput.rows = 3;
  noteInput.placeholder = "Write your note here...";
  noteInput.value = movie.note || "";

  const noteBtn = document.createElement("button");
  noteBtn.className = "mt-2 px-3 py-1 text-white rounded";

  const setBtnToSave = () => {
    noteBtn.textContent = "Save Note";
    noteBtn.classList.remove("bg-red-500");
    noteBtn.classList.add("bg-green-500");
    noteBtn.setAttribute("data-action", "save");
  };

  const setBtnToDelete = () => {
    noteBtn.textContent = "Delete Note";
    noteBtn.classList.remove("bg-green-500");
    noteBtn.classList.add("bg-red-500");
    noteBtn.setAttribute("data-action", "delete");
  };

  if (movie.note?.trim()) {
    setBtnToDelete();
  } else {
    setBtnToSave();
  }

  noteBtn.addEventListener("click", () => {
    let noteText = noteInput.value.trim();

    if (noteText === "") return;

    if (noteText.length > 500) {
      alert("Note is too long (max 500 characters).");
      return;
    }

    const action = noteBtn.getAttribute("data-action");
    const updatedNotes = [...favMovies];

    if (action === "save") {
      const movieToUpdate = updatedNotes.find((m) => m.id === movie.id);
      if (movieToUpdate) {
        movieToUpdate.note = noteText;
        saveToStorage(updatedNotes);
        setBtnToDelete();
      }
    } else if (action === "delete") {
      const movieToUpdate = updatedNotes.find((m) => m.id === movie.id);
      if (movieToUpdate) {
        movieToUpdate.note = "";
        saveToStorage(updatedNotes);
        noteInput.value = "";
        setBtnToSave();
      }
    }
  });

  noteInput.addEventListener("input", () => setBtnToSave());

  card.appendChild(noteLabel);
  card.appendChild(noteInput);
  card.appendChild(noteBtn);
}

renderFavMovies();
