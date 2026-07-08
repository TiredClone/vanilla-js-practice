const API_KEY = "8a85c9fc-51ab-4e5f-a560-2d4774198fbb";
const API_URL_POPULAR =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_250_MOVIES&page=1";
const API_URL_SEARCH =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
const API_URL_MOVIE_DETAITLS =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/";

async function getMovies(url) {
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY,
      },
    });
    const data = await response.json();
    showMovies(data);
    console.log(data);
    if (!response.ok) {
      throw new Error("Не удалось выполнить запрос");
    }
  } catch (error) {
    console.error("Произошла ошибка:", error);
  }
}

function getClassByRate(rate) {
  if (rate >= 7) {
    return "green";
  } else if (rate > 5) {
    return "orange";
  } else {
    return "red";
  }
}

function showMovies(data) {
  const moviesEl = document.querySelector(".movies");
  moviesEl.innerHTML = "";
  const dataItems = Array.isArray(data.films) ? data.films : data.items;
  dataItems.forEach((movie) => {
    const rating = movie.rating ?? movie.ratingKinopoisk;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
        <div class="movie__cover-inner">
            <img src="${movie.posterUrlPreview}" 
            alt="${movie.nameRu}" 
            class="movie__cover" />
            <div class="movie__cover--darkened"></div>
          </div>
          <div class="movie__info">
            <div class="movie__title">${movie.nameRu}</div>
            <div class="movie__category">${movie.genres.map(
              (genre) => ` ${genre.genre}`,
            )}</div>
            <div class="movie__average movie_average--${getClassByRate(rating)}">${rating}</div>
          </div>
            `;
    movieEl.addEventListener("click", () => openModal(movie.kinopoiskId));
    moviesEl.appendChild(movieEl);
  });
}

getMovies(API_URL_POPULAR);

const form = document.querySelector("form");
const search = document.querySelector(".header__search");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
  if (search.value) {
    getMovies(apiSearchUrl);

    search.value = "";
  }
});

// Modal
const modalEl = document.querySelector(".modal");

async function openModal(id) {
  let responceData = null
  try {
    const response = await fetch(API_URL_MOVIE_DETAITLS + id, {
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY,
      },
    });
    responceData = await response.json();
    console.log(responceData);
    if (!response.ok) {
      throw new Error("Не удалось выполнить запрос");
    }
  } catch (error) {
    console.error("Произошла ошибка:", error);
  }

  modalEl.classList.add("modal--show");
  document.body.classList.add("stop-scrolling")
  modalEl.innerHTML = `
  <div class="modal__card">
      <img class="modal__movie-backdrop" src="${responceData.posterUrl}" alt="">
      <h2>
        <span class="modal__movie-title">${responceData.nameRu}</span>
        <span class="modal__movie-release-year">${responceData.year}</span>
      </h2>
      <ul class="modal__movie-info">
        <div class="loader"></div>
        <li class="modal__movie-genre">Жанр - ${responceData.genres.map((genre) => `<span>${genre.genre}</span>`)}</li>
        ${responceData.filmLength ? `<li class="modal__movie-runtime">Время - ${responceData.filmLength} минут</li>` : ""}
        <li >Сайт: <a class="modal__movie-site" href="${responceData.webUrl}">${responceData.webUrl}</a></li>
        <li class="modal__movie-overview">Описание - ${responceData.description}</li>
      </ul>
      <button type="button" class="modal__button-close">Закрыть</button>
    </div>
`;

  const btnClose = document.querySelector(".modal");
  btnClose.addEventListener("click", () => closeModal());
}
function closeModal() {
  modalEl.classList.remove("modal--show");
  document.body.classList.remove("stop-scrolling")
}

window.addEventListener("click", (e) => {
  if (e.target === modalEl) {
    closeModal();
  }
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});
