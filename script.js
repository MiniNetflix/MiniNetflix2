// Utenti demo
const users = {
  "utente1": "password1",
  "utente2": "password2",
  "utente3": "password3"
};
let currentUser = null;

// Dati demo film e serie, stagioni, episodi e link
const seriesData = {
  "Ginny e Georgia": {
    seasons: {
      1: [
        { episode: 1, title: "Episodio 1", src: "https://drive.google.com/file/d/12Ew2SflLxJP6C6UuznxfX4ou-1e_1Xcq/preview" },
        { episode: 2, title: "Episodio 2", src: "https://drive.google.com/file/d/13wB1kyWtuHqINWpBYsfRSgbOIQ8404UE/preview" },
        { episode: 3, title: "Episodio 3", src: "https://drive.google.com/file/d/1axCVYDN7sJjm90pXt1hk3uJOZCIAtvtc/preview" },
        { episode: 10, title: "Episodio 10", src: "https://drive.google.com/file/d/1axCVYDN7sJjm90pXt1hk3uJOZCIAtvtc/preview" }
      ]
    }
  }
};

const moviesData = {
  "Il Padrino": {
    src: "https://drive.google.com/file/d/XYZ12345/preview"
  },
  "Inception": {
    src: "https://drive.google.com/file/d/ABC67890/preview"
  }
};

// Login
function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();

  if(users[user] && users[user] === pass) {
    currentUser = user;
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("main-app").style.display = "block";
    loadHome();
  } else {
    document.getElementById("login-error").innerText = "Credenziali errate";
  }
}

function logout() {
  currentUser = null;
  location.reload();
}

// Carica home con film e serie
function loadHome() {
  hideAllViews();
  document.getElementById("home-view").style.display = "block";

  // Serie
  const seriesUl = document.getElementById("series-list-ul");
  seriesUl.innerHTML = "";
  for (const serie in seriesData) {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.textContent = serie;
    btn.onclick = () => showSeasons(serie);
    li.appendChild(btn);
    seriesUl.appendChild(li);
  }

  // Film
  const moviesUl = document.getElementById("movies-list-ul");
  moviesUl.innerHTML = "";
  for (const movie in moviesData) {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.textContent = movie;
    btn.onclick = () => showMovie(movie);
    li.appendChild(btn);
    moviesUl.appendChild(li);
  }
}

// Mostra stagioni di una serie
function showSeasons(seriesName) {
  hideAllViews();
  const seasonList = document.getElementById("season-list");
  const seasonTitle = document.getElementById("season-title");
  const seasonsUl = document.getElementById("seasons-ul");

  seasonTitle.textContent = seriesName;
  seasonsUl.innerHTML = "";

  const seasons = seriesData[seriesName]?.seasons;
  if (!seasons) {
    seasonsUl.innerHTML = "<li>Nessuna stagione disponibile</li>";
  } else {
    for (const seasonNum in seasons) {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.textContent = "Stagione " + seasonNum;
      btn.onclick = () => showEpisodes(seriesName, seasonNum);
      li.appendChild(btn);
      seasonsUl.appendChild(li);
    }
  }

  seasonList.style.display = "block";
}

// Mostra episodi di una stagione
function showEpisodes(seriesName, seasonNum) {
  hideAllViews();
  const episodeList = document.getElementById("episode-list");
  const episodeTitle = document.getElementById("episode-title");
  const episodesContainer = document.getElementById("episodes-container");

  episodeTitle.textContent = seriesName + " - Stagione " + seasonNum;
  episodesContainer.innerHTML = "";

  const episodes = seriesData[seriesName]?.seasons[seasonNum];
  if (!episodes || episodes.length === 0) {
    episodesContainer.innerHTML = "<p>Nessun episodio disponibile</p>";
  } else {
    episodes.forEach(ep => {
      const div = document.createElement("div");
      const h3 = document.createElement("h3");
      h3.textContent = `Episodio ${ep.episode}: ${ep.title}`;
      const iframe = document.createElement("iframe");
      iframe.src = ep.src;
      iframe.allowFullscreen = true;
      iframe.frameBorder = "0";

      div.appendChild(h3);
      div.appendChild(iframe);
      episodesContainer.appendChild(div);
    });
  }

  episodeList.style.display = "block";
}

// Mostra film
function showMovie(movieName) {
  hideAllViews();
  const episodeList = document.getElementById("episode-list");
  const episodeTitle = document.getElementById("episode-title");
  const episodesContainer = document.getElementById("episodes-container");

  episodeTitle.textContent = movieName;
  episodesContainer.innerHTML = "";

  const movie = moviesData[movieName];
  if (!movie) {
    episodesContainer.innerHTML = "<p>Film non disponibile</p>";
  } else {
    const iframe = document.createElement("iframe");
    iframe.src = movie.src;
    iframe.allowFullscreen = true;
    iframe.frameBorder = "0";
    episodesContainer.appendChild(iframe);
  }

  episodeList.style.display = "block";
}

// Nascondi tutte le view
function hideAllViews() {
  document.querySelectorAll(".view").forEach(v => v.style.display = "none");
}

// Torna alla home
function backToHome() {
  loadHome();
}

// Torna alla lista stagioni
function backToSeasons() {
  document.getElementById("episode-list").style.display = "none";
  document.getElementById("season-list").style.display = "block";
}

// Funzione ricerca su film e serie
function filterContent() {
  const query = document.getElementById("search-bar").value.trim().toLowerCase();
  if (!query) {
    backToHome();
    return;
  }

  hideAllViews();
  const resultsView = document.getElementById("search-results");
  const resultsUl = document.getElementById("search-results-ul");
  resultsUl.innerHTML = "";

  // Cerca serie (nome serie)
  for (const serie in seriesData) {
    if (serie.toLowerCase().includes(query)) {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.textContent = `Serie TV: ${serie}`;
      btn.onclick = () => showSeasons(serie);
      li.appendChild(btn);
      resultsUl.appendChild(li);
    }
  }

  // Cerca film (nome film)
  for (const movie in moviesData) {
    if (movie.toLowerCase().includes(query)) {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.textContent = `Film: ${movie}`;
      btn.onclick = () => showMovie(movie);
      li.appendChild(btn);
      resultsUl.appendChild(li);
    }
  }

  // Se non ci sono risultati
  if (resultsUl.children.length === 0) {
    resultsUl.innerHTML = "<li>Nessun risultato trovato.</li>";
  }

  resultsView.style.display = "block";
}
