// 6e900aa1
// http://www.omdbapi.com/?apikey=[yourkey]&

// url = "http://www.omdbapi.com/?t=avengers"
// url2 = "http://www.omdbapi.com/?i=tt0120737"

const key = "6e900aa1";

const input = document.querySelector(".movie-input");
const movieCont = document.querySelector("#movie-row");

function renderMovie(img, title, year, plot, id) {
  return `
    <div class="row"  data-id = '${id}'>
      <img
        src="${img}"
        alt=""
        class="col-lg-6 img"
      />
      <div class="col-lg-5">
        <h5 class="movie-title">Title: ${title}</h5>
        <h6 class="movie-year">Year: ${year}</h6>
        <p class="movie-plot">Type: ${plot}
        </p>
        <p class = "more-btn" id = "ok1" onclick = "myFunc(this)">Read more</p>
      </div>
    </div>
    `;
}

async function requestMovie() {
  let searchInfo = input.value.trim();
  if (searchInfo != "") {
    document.querySelector(".welcome-text").style.display = "none";
    document.querySelector(".add-info").style.display = "none";
    movieCont.style.display = "flex";
  }
  let response = await fetch(
    `http://www.omdbapi.com/?s=${searchInfo}&page=1&apikey=${key}`
  );
  let data = await response.json();
  let newData = data.Search;
  if (data.Response == "True") {
    console.log(newData);
    movieCont.innerHTML = "";
    for (let i = 0; i < newData.length; i++) {
      let img = "image-not-found.png";
      if (newData[i].Poster != "N/A") {
        img = newData[i].Poster;
      }
      let title = newData[i].Title;
      let year = newData[i].Year;
      let plot = newData[i].Type;
      let id = newData[i].imdbID;

      let movieList = document.createElement("div");
      movieList.classList.add("col-lg-4");
      movieList.innerHTML = renderMovie(img, title, year, plot, id);
      movieCont.appendChild(movieList);
    }
  } else {
    console.log(data);
    movieCont.innerHTML = `<h1 align = "center" style="color:yellow;" >We cannot find this movie!</h1>`;
  }
}

function getBtn() {
  let moreBtns = document.querySelectorAll(".more-btn");
  console.log(moreBtns);
}

document.querySelector(".btn").addEventListener("click", requestMovie);
input.addEventListener("keyup", (e) => {
  if (e.keyCode == 13) requestMovie();
});

const darkBtn = document.querySelector(".fa-moon-o");
const lightBtn = document.querySelector(".fa-sun-o");

lightBtn.addEventListener("click", () => {
  document.querySelector("body").classList.remove("dark-theme");
  document.querySelector("body").classList.add("light-theme");
  lightBtn.style.display = "none";
  darkBtn.style.display = "block";
});

darkBtn.addEventListener("click", () => {
  document.querySelector("body").classList.remove("light-theme");
  document.querySelector("body").classList.add("dark-theme");
  darkBtn.style.display = "none";
  lightBtn.style.display = "block";
});

async function requestMovieInfo(id) {
  document.querySelector("#add-info-con").innerHTML = "";
  let response2 = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=${key}`);
  let data2 = await response2.json();
  let infoImg = data2.Poster;
  let infoTitle = data2.Title;
  let infoPlot = data2.Plot;
  let infoActors = data2.Actors;
  let infoYear = data2.Year;
  let infoGenre = data2.Genre;
  let infoLang = data2.Language;
  console.log(data2);
  let additional = document.createElement("div");
  // additional.innerHTML = "";
  additional.innerHTML = renderInfo(
    infoTitle,
    infoPlot,
    infoImg,
    infoYear,
    infoActors,
    infoGenre,
    infoLang
  );
  document.querySelector(".add-info").style.display = "block";
  document.querySelector("#add-info-con").appendChild(additional);
  movieCont.style.display = "none";
}

function myFunc(e) {
  let elem = e.closest(".row");
  let infoId = elem.dataset.id;
  //console.log(infoId);
  requestMovieInfo(infoId);
}

function renderInfo(title, plot, img, year, actors, genre, lang) {
  return `
  <div class="row" id="app-cont">
  <img src="${img}" alt="" class="col-lg-4 add-img" />
  <div class="col-lg-5">
    <h2 class="add-title">Title: ${title}</h2>
    <h4 class="add-year">Year: ${year}</h4>
    <h4 class="add-author">Authors: ${actors}</h4>
    <h4 class="add-plot">
      Plot: ${plot}
    </h4>
    <h4 class="add-lang">Languages: ${lang}</h4>
    <h4 class="add-genre">Genre: ${genre}</h4>
  </div>
</div>
  `;
}
