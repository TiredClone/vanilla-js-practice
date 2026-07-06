const API_KEY = "";
const API_URL_POPULAR =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_250_MOVIES&page=1";
const API_URL_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword="

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

function getClassByRate(rate){
    if(rate >= 7){
        return "green";
    } else if (rate > 5) {
        return "orange";
    } else {
        return "red" ;
    }
}

function showMovies(data) {
  const moviesEl = document.querySelector(".movies");
  moviesEl.innerHTML = "";
  const dataItems = Array.isArray(data.films) ? data.films : data.items
  dataItems.forEach((movie) => {
    const rating = movie.rating ?? movie.ratingKinopoisk
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
                genre => ` ${genre.genre}`)}</div>
            <div class="movie__average movie_average--${getClassByRate(rating)}">${rating}</div>
          </div>
            `;
            moviesEl.appendChild(movieEl);
  });
}

getMovies(API_URL_POPULAR);

const form = document.querySelector("form");
const search = document.querySelector(".header__search");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const apiSearchUrl = `${API_URL_SEARCH}${search.value}`
    if(search.value) {
        getMovies(apiSearchUrl);

        search.value = ""
    }
})