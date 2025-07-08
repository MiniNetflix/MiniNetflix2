const users = {
  "utente1": "password1",
  "utente2": "password2"
};
let currentUser = null;

const seriesData = {
  "Ginny e Georgia": {
    img: "https://i.imgur.com/CScKmEZ.jpeg",
    seasons: {
      1: [
        { episode: 1, title: "Episodio 1", src: "https://drive.google.com/file/d/12Ew2SflLxJP6C6UuznxfX4ou-1e_1Xcq/preview" },
        { episode: 2, title: "Episodio 2", src: "https://drive.google.com/file/d/13wB1kyWtuHqINWpBYsfRSgbOIQ8404UE/preview" }
      ]
    }
  },
  "Breaking Bad": {
    img: "https://via.placeholder.com/150x220?text=Breaking+Bad",
    seasons: {
      1: [
        { episode: 1, title: "Pilot", src: "https://www.youtube.com/embed/HhesaQXLuRY" }
      ]
    }
  }
};

const moviesData = {
  "Il Padrino": {
    img: "https://via.placeholder.com/150x220?text=Il+Padrino",
    src: "https://supervideo.cc/oz82xaij80cd"
  },
  "Inception": {
    img: "https://via.placeholder.com/150x220?text=Inception",
    src: "https://www.youtube.com/embed/8hP9D6kZseM"
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

  const seriesDiv = document.getElementById("series-list-div");
  seriesDiv.innerHTML = "";
  let seriesCount = 0;
  for (const serie in seriesData) {
    if (seriesCount >= 24) break;
    const card = createCard(serie, seriesData[serie].img, () => showSeasons(serie));
    seriesDiv.appendChild(card);
    seriesCount++;
  }

  const moviesDiv = document.getElementById("movies-list-div");
  moviesDiv.innerHTML = "";
  let moviesCount = 0;
  for (const movie in moviesData) {
    if (moviesCount >= 24) break;
    const card = createCard(movie, moviesData[movie].img, () => showMovie(movie));
    moviesDiv.appendChild(card);
    moviesCount++;
  }
}

function createCard(title, imgUrl, onClick) {
  const div = document.createElement("div");
  div.className = "card";
  div.onclick = onClick;

  const img = document.createElement("img");
  img.src = imgUrl;
  const titleDiv = document.createElement("div");
  titleDiv.className = "card-title";
  titleDiv.textContent = title;

  div.appendChild(img);
  div.appendChild(titleDiv);
  return div;
}

function showAll(type) {
  hideAllViews();
  document.getElementById("home-view").style.display = "block";

  const container = type === "series" ? document.getElementById("series-list-div") : document.getElementById("movies-list-div");
  const data = type === "series" ? seriesData : moviesData;

  container.innerHTML = "";
  for (const key in data) {
    const card = createCard(key, data[key].img, () => {
      type === "series" ? showSeasons(key) : showMovie(key);
    });
    container.appendChild(card);
  }
}

function showSeasons(seriesName) {
  hideAllViews();
  document.getElementById("season-title").textContent = seriesName;
  const seasonsUl = document.getElementById("seasons-ul");
  seasonsUl.innerHTML = "";

  const seasons = seriesData[seriesName].seasons;
  for (const seasonNum in seasons) {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.textContent = `Stagione ${seasonNum}`;
    btn.onclick = () => showEpisodes(seriesName, seasonNum);
    li.appendChild(btn);
    seasonsUl.appendChild(li);
  }

  document.getElementById("season-list").style.display = "block";
}

function showEpisodes(seriesName, seasonNum) {
  hideAllViews();
  document.getElementById("episode-title").textContent = `${seriesName} - Stagione ${seasonNum}`;
  const container = document.getElementById("episodes-container");
  container.innerHTML = "";

  const episodes = seriesData[seriesName].seasons[seasonNum];
  for (const ep of episodes) {
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
  }

  document.getElementById("episode-list").style.display = "block";
}

function showMovie(movieName) {
  hideAllViews();
  document.getElementById("episode-title").textContent = movieName;
  const container = document.getElementById("episodes-container");
  container.innerHTML = "";

  const movie = moviesData[movieName];
  const iframe = document.createElement("iframe");
  iframe.src = movie.src;
  iframe.allowFullscreen = true;
  iframe.frameBorder = "0";
  container.appendChild(iframe);

  document.getElementById("episode-list").style.display = "block";
}

function hideAllViews() {
  document.querySelectorAll(".view").forEach(v => v.style.display = "none");
}

function backToHome() {
  loadHome();
}

function filterContent() {
  const query = document.getElementById("search-bar").value.trim().toLowerCase();
  if (!query) return loadHome();

  hideAllViews();
  const ul = document.getElementById("search-results-ul");
  ul.innerHTML = "";

  for (const serie in seriesData) {
    if (serie.toLowerCase().includes(query)) {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.textContent = `Serie TV: ${serie}`;
      btn.onclick = () => showSeasons(serie);
      li.appendChild(btn);
      ul.appendChild(li);
    }
  }

  for (const movie in moviesData) {
    if (movie.toLowerCase().includes(query)) {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.textContent = `Film: ${movie}`;
      btn.onclick = () => showMovie(movie);
      li.appendChild(btn);
      ul.appendChild(li);
    }
  }

  if (ul.children.length === 0) {
    ul.innerHTML = "<li>Nessun risultato trovato.</li>";
  }

  document.getElementById("search-results").style.display = "block";
}
