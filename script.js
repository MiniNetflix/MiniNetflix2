const USERS = {
  "user1": "password1",
  "user2": "password2",
  "user3": "password3",
  "mario": "ciao123",
  "anna": "securepass"
};
let currentUser = null;

// Dati video dinamici
const films = [
  {
    title: "Film Esempio 1",
    src: "https://vjs.zencdn.net/v/oceans.mp4",
    type: "video/mp4"
  },
  {
    title: "Film Esempio 2",
    src: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    type: "video/mp4"
  }
];

const serieTV = [
  {
    title: "Ginny e Georgia ST1 E10",
    src: "https://vjs.zencdn.net/v/oceans.mp4",
    type: "video/mp4"
  },
  {
    title: "Serie TV Esempio",
    src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
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
  document.getElementById("login-screen").style.display = "block";
  document.getElementById("app").style.display = "none";
  clearVideos();
  clearHistory();
}

// Render video nelle sezioni
function renderVideos() {
  // Film
  const filmSection = document.getElementById("film-section");
  filmSection.innerHTML = "";
  films.forEach((video, i) => {
    filmSection.appendChild(createVideoElement(video, i, "film"));
  });

  // Serie TV
  const serieSection = document.getElementById("serie-section");
  serieSection.innerHTML = "";
  serieTV.forEach((video, i) => {
    serieSection.appendChild(createVideoElement(video, i, "serie"));
  });
}

// Crea elemento video con video.js
function createVideoElement(video, index, category) {
  const container = document.createElement("div");
  container.className = "video-item";

  const title = document.createElement("h3");
  title.textContent = video.title;
  container.appendChild(title);

  const videoTag = document.createElement("video");
  videoTag.className = "video-js vjs-default-skin";
  videoTag.controls = true;
  videoTag.preload = "auto";
  videoTag.width = 720;
  videoTag.height = 400;
  videoTag.setAttribute("data-setup", "{}");
  videoTag.id = `${category}-video-${index}`;

  const source = document.createElement("source");
  source.src = video.src;
  source.type = video.type;

  videoTag.appendChild(source);
  container.appendChild(videoTag);

  // Setup player con video.js
  const player = videojs(videoTag.id);

  // Salvataggio cronologia quando il video viene messo in pausa o termina
  player.on("pause", () => {
    saveHistory(video.title, video.src);
  });
  player.on("ended", () => {
    saveHistory(video.title, video.src);
  });

  return container;
}

// Pulisce i video (quando fai logout)
function clearVideos() {
  document.getElementById("film-section").innerHTML = "";
  document.getElementById("serie-section").innerHTML = "";
  document.getElementById("history-list").innerHTML = "";
}

// Cronologia

function getStorageKey() {
  return `mininetflix_history_${currentUser}`;
}

function saveHistory(title, src) {
  if (!currentUser) return;
  let history = JSON.parse(localStorage.getItem(getStorageKey()) || "[]");
  // Non duplicare lo stesso video se è già in cima
  if (history.length === 0 || history[0].src !== src) {
    history.unshift({ title, src, timestamp: Date.now() });
    // Limita la cronologia a 20 elementi
    if (history.length > 20) history.pop();
    localStorage.setItem(getStorageKey(), JSON.stringify(history));
    loadHistory();
  }
}

function loadHistory() {
  if (!currentUser) return;
  const historyList = document.getElementById("history-list");
  historyList.innerHTML = "";

  let history = JSON.parse(localStorage.getItem(getStorageKey()) || "[]");
  if (history.length === 0) {
    historyList.textContent = "Nessuna cronologia disponibile.";
    return;
  }

  history.forEach((item, i) => {
    const div = document.createElement("div");
    div.textContent = item.title;
    div.title = new Date(item.timestamp).toLocaleString();
    div.onclick = () => {
      playVideoFromHistory(item);
      // Cambia sezione su film o serie in base a url
      if (films.some(f => f.src === item.src)) {
        switchSection("film");
      } else if (serieTV.some(s => s.src === item.src)) {
        switchSection("serie");
      }
    };
    historyList.appendChild(div);
  });
}

function clearHistory() {
  const historyList = document.getElementById("history-list");
  historyList.innerHTML = "";
}

// Funzione per far partire un video dalla cronologia
function playVideoFromHistory(item) {
  // Trova il video nel DOM e lo fa partire
  let videoEl = null;
  // Cerca in film
  for (let i = 0; i < films.length; i++) {
    if (films[i].src === item.src) {
      videoEl = videojs(`film-video-${i}`);
      break;
    }
  }
  // Cerca in serie se non trovato in film
  if (!videoEl) {
    for (let i = 0; i < serieTV.length; i++) {
      if (serieTV[i].src === item.src) {
        videoEl = videojs(`serie-video-${i}`);
        break;
      }
    }
  }
  if (videoEl) {
    videoEl.play();
  }
}

// Menu e cambio sezione
const menuItems = document.querySelectorAll(".menu-item");
menuItems.forEach(item => {
  item.addEventListener("click", () => {
    const section = item.getAttribute("data-section");
    switchSection(section);
    menuItems.forEach(mi => mi.classList.remove("active"));
    item.classList.add("active");
  });
});

function switchSection(section) {
  document.querySelectorAll(".section-content").forEach(sec => {
    sec.style.display = "none";
  });
  const el = document.getElementById(section + "-section");
  if (el) el.style.display = "block";
}
