// Utenti demo
const users = {
  "utente1": "password1",
  "utente2": "password2",
  "utente3": "password3"
};
let currentUser = null;

// Dati demo con immagini
const seriesData = {
  "Ginny e Georgia": {
    image: "https://via.placeholder.com/300x180?text=Ginny+e+Georgia",
    seasons: {
      1: [
        { episode: 1, title: "Episodio 1", src: "https://drive.google.com/file/d/12Ew2SflLxJP6C6UuznxfX4ou-1e_1Xcq/preview" },
        { episode: 2, title: "Episodio 2", src: "https://drive.google.com/file/d/13wB1kyWtuHqINWpBYsfRSgbOIQ8404UE/preview" },
        { episode: 3, title: "Episodio 3", src: "https://drive.google.com/file/d/1axCVYDN7sJjm90pXt1hk3uJOZCIAtvtc/preview" }
      ]
    }
  },
  "Stranger Things": {
    image: "https://via.placeholder.com/300x180?text=Stranger+Things",
    seasons: {
      1: []
    }
  }
};

const moviesData = {
  "Il Padrino": {
    image: "https://via.placeholder.com/300x180?text=Il+Padrino",
    src: "https://drive.google.com/file/d/XYZ12345/preview"
  },
  "Inception": {
    image: "https://via.placeholder.com/300x180?text=Inception",
    src: "https://drive.google.com/file/d/ABC67890/preview"
  },
  "Interstellar": {
    image: "https://via.placeholder.com/300x180?text=Interstellar",
    src: "https://drive.google.com/file/d/DEF12345/preview"
  }
};

function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();

  if (users[user] && users[user] === pass) {
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

function loadHome() {
  hideAllViews();
  document.getElementById("home-view").style.display = "block";

  renderCardList("series-list-ul", seriesData, showSeasons, "serie");
  renderCardList("movies-list-ul", moviesData, showMovie, "film");
}

function renderCardList(containerId, data, clickHandler, type) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  const keys = Object.keys(data);

  const limit = 24;
  const showLimited = keys.length > limit;
  const slice = showLimited ? keys.slice(0, limit) : keys;

  const wrapper = document.createElement("div");
  wrapper.className = "card-container";
  container.appendChild(wrapper);

  slice.forEach(key => {
    const item = data[key];
    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.src = item.image || "https://via.placeholder.com/300x180?text=No+Image";

    const title = document.createElement("div");
    title.className = "card-title";
    title.textContent = key;

    card.appendChild(img);
    card.appendChild(title);
    card.onclick = () => clickHandler(key);

    wrapper.appendChild(card);
  });

  if (showLimited) {
    const seeAllBtn = document.createElement("button");
    seeAllBtn.className = "see-all-btn";
    seeAllBtn.textContent = `Vedi tutti i ${type === "serie" ? "serie TV" : "film"}`;
    seeAllBtn.onclick = () => showAllCategory(type);
    container.appendChild(seeAllBtn);
  }
}

function showAllCategory(type) {
  hideAllViews();
  const view = document.getElementById("search-results");
  const ul = document.getElementById("search-results-ul");
  ul.innerHTML = "";

  const data = type === "serie" ? seriesData : moviesData;

  const wrapper = document.createElement("div");
  wrapper.className = "card-container";
  ul.appendChild(wrapper);

  Object.keys(data).forEach(key => {
    const item = data[key];
    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.src = item.image || "https://via.placeholder.com/300x180?text=No+Image";

    const title = document.createElement("div");
    title.className = "card-title";
    title.textContent = key;

    card.appendChild(img);
    card.appendChild(title);
    card.onclick = () => (type === "serie" ? showSeasons(key) : showMovie(key));

    wrapper.appendChild(card);
  });

  view.style.display = "block";
}

function showSeasons(seriesName) {
  hideAllViews();
  document.getElementById("season-title").textContent = seriesName;
  const ul = document.getElementById("seasons-ul");
  ul.innerHTML = "";

  const seasons = seriesData[seriesName]?.seasons;
  if (!seasons) {
    ul.innerHTML = "<li>Nessuna stagione disponibile</li>";
  } else {
    for (const seasonNum in seasons) {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.textContent = "Stagione " + seasonNum;
      btn.onclick = () => showEpisodes(seriesName, seasonNum);
      li.appendChild(btn);
      ul.appendChild(li);
    }
  }
  document.getElementById("season-list").style.display = "block";
}

function showEpisodes(seriesName, seasonNum) {
  hideAllViews();
  const container = document.getElementById("episodes-container");
  document.getElementById("episode-title").textContent = `${seriesName} - Stagione ${seasonNum}`;
  container.innerHTML = "";

  const episodes = seriesData[seriesName]?.seasons[seasonNum];
  if (!episodes || episodes.length === 0) {
    container.innerHTML = "<p>Nessun episodio disponibile</p>";
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
      container.appendChild(div);
    });
  }
  document.getElementById("episode-list").style.display = "block";
}

function showMovie(movieName) {
  hideAllViews();
  document.getElementById("episode-title").textContent = movieName;
  const container = document.getElementById("episodes-container");
  container.innerHTML = "";

  const movie = moviesData[movieName];
  if (!movie) {
    container.innerHTML = "<p>Film non disponibile</p>";
  } else {
    const iframe = document.createElement("iframe");
    iframe.src = movie.src;
    iframe.allowFullscreen = true;
    iframe.frameBorder = "0";
    container.appendChild(iframe);
  }
  document.getElementById("episode-list").style.display = "block";
}

function hideAllViews() {
  document.querySelectorAll(".view").forEach(v => v.style.display = "none");
}

function backToHome() {
  loadHome();
}

function backToSeasons() {
  document.getElementById("episode-list").style.display = "none";
  document.getElementById("season-list").style.display = "block";
}

function filterContent() {
  const query = document.getElementById("search-bar").value.trim().toLowerCase();
  if (!query) {
    backToHome();
    return;
  }

  hideAllViews();
  const view = document.getElementById("search-results");
  const ul = document.getElementById("search-results-ul");
  ul.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.className = "card-container";
  ul.appendChild(wrapper);

  for (const serie in seriesData) {
    if (serie.toLowerCase().includes(query)) {
      const item = seriesData[serie];
      const card = document.createElement("div");
      card.className = "card";
      const img = document.createElement("img");
      img.src = item.image || "https://via.placeholder.com/300x180";
      const title = document.createElement("div");
      title.className = "card-title";
      title.textContent = serie;
      card.appendChild(img);
      card.appendChild(title);
      card.onclick = () => showSeasons(serie);
      wrapper.appendChild(card);
    }
  }

  for (const movie in moviesData) {
    if (movie.toLowerCase().includes(query)) {
      const item = moviesData[movie];
      const card = document.createElement("div");
      card.className = "card";
      const img = document.createElement("img");
      img.src = item.image || "https://via.placeholder.com/300x180";
      const title = document.createElement("div");
      title.className = "card-title";
      title.textContent = movie;
      card.appendChild(img);
      card.appendChild(title);
      card.onclick = () => showMovie(movie);
      wrapper.appendChild(card);
    }
  }

  if (!wrapper.hasChildNodes()) {
    ul.innerHTML = "<li>Nessun risultato trovato.</li>";
  }

  view.style.display = "block";
}
