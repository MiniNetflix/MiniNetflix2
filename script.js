const users = {
  "Alessio": "1234",
  "Marco": "pelopelo"
};
let currentUser = null;

// Serie TV (oggetto)
const seriesList = {
  "Ginny e Georgia": {
    img: "https://i.imgur.com/CScKmEZ.jpeg",
    seasons: {
      1: [
        { episode: 1, title: "Pilot", src: "https://drive.google.com/file/d/12Ew2SflLxJP6C6UuznxfX4ou-1e_1Xcq/preview" },
        { episode: 2, title: "E' un viso, non una maschera", src: "https://drive.google.com/file/d/13wB1kyWtuHqINWpBYsfRSgbOIQ8404UE/preview" }
        // ... altri episodi
      ],
      2: [
        { episode: 1, title: "Bentornati str**zetti", src: "https://drive.google.com/file/d/12Ew2SflLxJP6C6UuznxfX4ou-1e_1Xcq/preview" }
        // ... altri episodi
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

// Film (oggetto)
const moviesList = {
  "Il buco: Capitolo 2": {
    img: "https://i.imgur.com/dezd4Vb.jpeg",
    src: "https://drive.google.com/file/d/1WVhXNNE26fbIbweJ-Zk5RzBIQSSolr2t/preview"
  },
  "Harry Potter e i doni della morte: I parte": {
    img: "https://i.imgur.com/4q0eRaQ.jpeg",
    src: "https://drive.google.com/file/d/1Rfr4vh6xVEoG5f-WMeeQyoChIGInwQAt/preview"
  }
  // ... altri film
};

const maxItems = 24;

function showHome() {
  document.getElementById("home-view").style.display = "block";
  document.getElementById("series-view").style.display = "none";
  document.getElementById("video-view").style.display = "none";
  document.getElementById("login-view").style.display = "none";
  loadHomeContent();
}

function loadHomeContent() {
  const seriesContainer = document.getElementById("series-list-div");
  const moviesContainer = document.getElementById("movies-list-div");

  seriesContainer.innerHTML = "";
  moviesContainer.innerHTML = "";

  const seriesKeys = Object.keys(seriesList).slice(0, maxItems);
  const moviesKeys = Object.keys(moviesList).slice(0, maxItems);

  seriesKeys.forEach(title => {
    const card = createCard(title, seriesList[title]);
    seriesContainer.appendChild(card);
  });

  moviesKeys.forEach(title => {
    const card = createCard(title, moviesList[title]);
    moviesContainer.appendChild(card);
  });
}

function createCard(title, item) {
  const card = document.createElement("div");
  card.className = "card";

  const img = document.createElement("img");
  img.src = item.img;
  img.alt = title;
  card.appendChild(img);

  const titleElem = document.createElement("p");
  titleElem.textContent = title;
  card.appendChild(titleElem);

  card.onclick = () => {
    if (item.seasons) {
      showSeasons(title, item);
    } else {
      playVideo(item);
    }
  };

  return card;
}

function showSeasons(title, series) {
  document.getElementById("home-view").style.display = "none";
  document.getElementById("series-view").style.display = "block";
  document.getElementById("video-view").style.display = "none";

  const titleElem = document.getElementById("episode-title");
  titleElem.textContent = title;

  const listContainer = document.getElementById("episode-list");
  listContainer.innerHTML = "";

  for (const seasonNumber in series.seasons) {
    const seasonDiv = document.createElement("div");
    seasonDiv.className = "season";

    const seasonTitle = document.createElement("h3");
    seasonTitle.textContent = `Stagione ${seasonNumber}`;
    seasonDiv.appendChild(seasonTitle);

    series.seasons[seasonNumber].forEach(episode => {
      const epDiv = document.createElement("div");
      epDiv.className = "episode";
      epDiv.textContent = episode.title;
      epDiv.onclick = () => playVideo(episode);
      seasonDiv.appendChild(epDiv);
    });

    listContainer.appendChild(seasonDiv);
  }
}

function playVideo(video) {
  document.getElementById("home-view").style.display = "none";
  document.getElementById("series-view").style.display = "none";
  document.getElementById("video-view").style.display = "block";

  const videoPlayer = document.getElementById("video-player");
  videoPlayer.src = video.src;
  videoPlayer.play();

  document.getElementById("video-title").textContent = video.title;
}

function showAll(type) {
  const container = document.getElementById("episode-list");
  container.innerHTML = "";

  const items = type === "series" ? seriesList : moviesList;
  document.getElementById("home-view").style.display = "none";
  document.getElementById("series-view").style.display = "block";
  document.getElementById("video-view").style.display = "none";

  document.getElementById("episode-title").textContent =
    type === "series" ? "Tutte le Serie TV" : "Tutti i Film";

  const backButton = document.createElement("button");
  backButton.textContent = "Torna alla Home";
  backButton.onclick = backToHome;
  container.parentElement.insertBefore(backButton, container);

  Object.keys(items).forEach(title => {
    const card = createCard(title, items[title]);
    container.appendChild(card);
  });
}

function backToHome() {
  showHome();
}

function login() {
  document.getElementById("home-view").style.display = "none";
  document.getElementById("series-view").style.display = "none";
  document.getElementById("video-view").style.display = "none";
  document.getElementById("login-view").style.display = "block";
}

function submitLogin() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (users[username] && users[username] === password) {
    currentUser = username;
    showHome();
  } else {
    alert("Credenziali non valide");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  login();
});
