const USERS = {
  "user1": "password1",
  "user2": "password2",
  "user3": "password3"
};
let currentUser = null;

// Link diretti Google Drive (sostituisci ID con i tuoi file)
const films = [
  {
    title: "Film Google Drive 1",
    src: "https://drive.google.com/uc?export=download&id=ID_FILE_1",
    type: "video/mp4"
  },
  {
    title: "Film Google Drive 2",
    src: "https://drive.google.com/uc?export=download&id=ID_FILE_2",
    type: "video/mp4"
  }
];

const serieTV = [
  {
    title: "Serie Google Drive 1",
    src: "https://drive.google.com/uc?export=download&id=ID_FILE_3",
    type: "video/mp4"
  },
  {
    title: "Serie Google Drive 2",
    src: "https://drive.google.com/uc?export=download&id=ID_FILE_4",
    type: "video/mp4"
  }
];

// Login
function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorElem = document.getElementById("login-error");

  if (USERS[username] && USERS[username] === password) {
    currentUser = username;
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("app").style.display = "flex";
    errorElem.textContent = "";
    renderVideos();
    loadHistory();
  } else {
    errorElem.textContent = "Username o password errati.";
  }
}

// Logout
function logout() {
  currentUser = null;
  document.getElementById("app").style.display = "none";
  document.getElementById("login-screen").style.display = "block";
  clearContentHighlights();
  document.getElementById("film-section").innerHTML = "";
  document.getElementById("serie-section").innerHTML = "";
  document.getElementById("history-list").innerHTML = "";
}

// Render video dinamici
function renderVideos() {
  const filmSection = document.getElementById("film-section");
  const serieSection = document.getElementById("serie-section");

  filmSection.innerHTML = "";
  serieSection.innerHTML = "";

  films.forEach((video, index) => {
    filmSection.appendChild(createVideoItem(video, index, "film"));
  });

  serieTV.forEach((video, index) => {
    serieSection.appendChild(createVideoItem(video, index, "serie"));
  });
}

// Crea elemento video con video.js player
function createVideoItem(video, idx, tipo) {
  const container = document.createElement("div");
  container.className = "video-item";
  container.dataset.title = video.title;

  const title = document.createElement("h3");
  title.textContent = video.title;
  container.appendChild(title);

  const videoTag = document.createElement("video");
  videoTag.className = "video-js vjs-default-skin";
  videoTag.controls = true;
  videoTag.width = 720;
  videoTag.height = 400;
  videoTag.preload = "none";
  videoTag.id = `${tipo}-video-${idx}`;

  // Source
  const source = document.createElement("source");
  source.src = video.src;
  source.type = video.type;
  videoTag.appendChild(source);

  container.appendChild(videoTag);

  // Setup video.js player
  setTimeout(() => {
    if (videojs.getPlayer(videoTag.id)) {
      videojs.getPlayer(videoTag.id).dispose();
    }
    const player = videojs(videoTag.id);

    player.on("play", () => {
      addToHistory(video.title, video.src);
    });
  }, 50);

  return container;
}

// Menu selezione
document.querySelectorAll("#sidebar .menu-item").forEach(item => {
  item.addEventListener("click", () => {
    clearContentHighlights();
    item.classList.add("active");
    const section = item.dataset.section;
    document.querySelectorAll(".section-content").forEach(sec => {
      sec.style.display = "none";
    });
    if (section === "film") {
      document.getElementById("film-section").style.display = "block";
    } else if (section === "serie") {
      document.getElementById("serie-section").style.display = "block";
    } else if (section === "cronologia") {
      document.getElementById("cronologia-section").style.display = "block";
      loadHistory();
    }
  });
});

function clearContentHighlights() {
  document.querySelectorAll("#sidebar .menu-item").forEach(item => {
    item.classList.remove("active");
  });
}

// Cronologia (in localStorage)
function addToHistory(title, src) {
  if (!currentUser) return;

  let history = JSON.parse(localStorage.getItem(`history_${currentUser}`)) || [];

  // Evita duplicati
  if (!history.find(item => item.src === src)) {
    history.push({ title, src, date: new Date().toISOString() });
    localStorage.setItem(`history_${currentUser}`, JSON.stringify(history));
  }
}

function loadHistory() {
  if (!currentUser) return;

  const historyList = document.getElementById("history-list");
  historyList.innerHTML = "";

  let history = JSON.parse(localStorage.getItem(`history_${currentUser}`)) || [];

  if (history.length === 0) {
    historyList.innerHTML = "<p>Nessun video guardato.</p>";
    return;
  }

  history.forEach((item, idx) => {
    const div = document.createElement("div");
    div.textContent = `${item.title}`;
    div.title = `Guardato il: ${new Date(item.date).toLocaleString()}`;
    div.style.userSelect = "none";

    div.onclick = () => {
      // Passa alla sezione video
      clearContentHighlights();
      const filmMenu = document.querySelector("#sidebar .menu-item[data-section='film']");
      const serieMenu = document.querySelector("#sidebar .menu-item[data-section='serie']");

      // Verifica se è film o serie (controlla nella lista)
      const foundFilm = films.find(f => f.src === item.src);
      const foundSerie = serieTV.find(s => s.src === item.src);

      if (foundFilm) {
        filmMenu.classList.add("active");
        document.getElementById("film-section").style.display = "block";
        document.getElementById("serie-section").style.display = "none";
      } else if (foundSerie) {
        serieMenu.classList.add("active");
        document.getElementById("serie-section").style.display = "block";
        document.getElementById("film-section").style.display = "none";
      }

      document.getElementById("cronologia-section").style.display = "none";

      // Avvia il video corrispondente
      setTimeout(() => {
        let playerId = "";
        if (foundFilm) {
          playerId = `film-video-${films.indexOf(foundFilm)}`;
        } else if (foundSerie) {
          playerId = `serie-video-${serieTV.indexOf(foundSerie)}`;
        }
        if (playerId) {
          const player = videojs(playerId);
          player.ready(() => {
            player.currentTime(0);
            player.play();
          });
        }
      }, 200);
    };

    historyList.appendChild(div);
  });
}
