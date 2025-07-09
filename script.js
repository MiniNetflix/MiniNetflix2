// Sezione per il caricamento dei dati delle serie e dei film
const seriesList = [
 "Ginny e Georgia": {
    img: "https://i.imgur.com/CScKmEZ.jpeg",
    seasons: {
      1: [
        { episode: 1, title: "Pilot", src: "https://drive.google.com/file/d/12Ew2SflLxJP6C6UuznxfX4ou-1e_1Xcq/preview" },
        { episode: 2, title: "E' un viso, non una maschera", src: "https://drive.google.com/file/d/13wB1kyWtuHqINWpBYsfRSgbOIQ8404UE/preview" },
        { episode: 3, title: "Cose che si addicono solo a gente ricca", src: "https://drive.google.com/file/d/1SagpLPK4OmTmeO0dr23xfeA1rfkmFFv4/preview" },
        { episode: 4, title: "Lydia Bennet è senza dubbio femminista", src: "https://drive.google.com/file/d/1uM6S1cUnBRT_wRLsxvX0VO5oZ6MAIbVU/preview" },
        { episode: 5, title: "Boo, brutta stron*a", src: "https://drive.google.com/file/d/1MFYR1es-2PzE40642-nuaMJQ7GE0QHOZ/preview" },
        { episode: 6, title: "Non mi capite", src: "https://drive.google.com/file/d/1Rfr4vh6xVEoG5f-WMeeQyoChIGInwQAt/preview" },
        { episode: 7, title: "Buon compleanno sciocca", src: "https://drive.google.com/file/d/1Kq7Fs06knX-6VOXQTs0hqphJ3Q3srCun/preview" },
        { episode: 8, title: "Croce su una parte, croce sull'altra", src: "https://drive.google.com/file/d/1kLJ29kNZnz_RF5NDSXVJvSdWUHe6TC5J/preview" },
        { episode: 9, title: "Amare è difficile", src: "https://drive.google.com/file/d/1-1Au2tWQIj37QW_PFj3mG71i_k4YS3Rc/preview" },
        { episode: 10, title: "Il peggior tradimento dai tempi di Jordyn e Kylie", src: "https://drive.google.com/file/d/1jv_pet7AY2Yvrwa0-HmZc_GRGcEeu01o/preview" }
      ],
      2: [
        { episode: 1, title: "Bentornati str**zetti", src: "https://drive.google.com/file/d/12Ew2SflLxJP6C6UuznxfX4ou-1e_1Xcq/preview" },
        { episode: 2, title: "Perchè tutto deve diventare cosi terribile, ogni volta, sempre?", src: "https://drive.google.com/file/d/13wB1kyWtuHqINWpBYsfRSgbOIQ8404UE/preview" },
        { episode: 3, title: "Che cosa hai in mente, ragazzina?", src: "https://drive.google.com/file/d/1SagpLPK4OmTmeO0dr23xfeA1rfkmFFv4/preview" },
        { episode: 4, title: "Buon mio compleanno a voi", src: "https://drive.google.com/file/d/1uM6S1cUnBRT_wRLsxvX0VO5oZ6MAIbVU/preview" },
        { episode: 5, title: "I latkes sono eccellenti", src: "https://drive.google.com/file/d/1MFYR1es-2PzE40642-nuaMJQ7GE0QHOZ/preview" },
        { episode: 6, title: "Questo è lo speciale Natale di Ginny & Georgia", src: "https://drive.google.com/file/d/1Rfr4vh6xVEoG5f-WMeeQyoChIGInwQAt/preview" },
        { episode: 7, title: "Lascia fare a noi tutto il resto", src: "https://drive.google.com/file/d/1Kq7Fs06knX-6VOXQTs0hqphJ3Q3srCun/preview" },
        { episode: 8, title: "Ascolta! L'oscurità scende...", src: "https://drive.google.com/file/d/1kLJ29kNZnz_RF5NDSXVJvSdWUHe6TC5J/preview" },
        { episode: 9, title: "Prima o poi lo uccido", src: "https://drive.google.com/file/d/1-1Au2tWQIj37QW_PFj3mG71i_k4YS3Rc/preview" },
        { episode: 10, title: "Non sono Cenerentola", src: "https://drive.google.com/file/d/1jv_pet7AY2Yvrwa0-HmZc_GRGcEeu01o/preview" }
      ],
      3: [
        { episode: 1, title: "Non sarebbe un buon podcast", src: "https://drive.google.com/file/d/12Ew2SflLxJP6C6UuznxfX4ou-1e_1Xcq/preview" },
        { episode: 2, title: "Maledetto bip, bip", src: "https://drive.google.com/file/d/13wB1kyWtuHqINWpBYsfRSgbOIQ8404UE/preview" },
        { episode: 3, title: "Gli amici ballano", src: "https://drive.google.com/file/d/1SagpLPK4OmTmeO0dr23xfeA1rfkmFFv4/preview" },
        { episode: 4, title: "E' tornata la str***a", src: "https://drive.google.com/file/d/1uM6S1cUnBRT_wRLsxvX0VO5oZ6MAIbVU/preview" },
        { episode: 5, title: "La dinamite fa bum", src: "https://drive.google.com/file/d/1MFYR1es-2PzE40642-nuaMJQ7GE0QHOZ/preview" },
        { episode: 6, title: "Almeno non può andare peggio", src: "https://drive.google.com/file/d/1Rfr4vh6xVEoG5f-WMeeQyoChIGInwQAt/preview" },
        { episode: 7, title: "E' pazzesco", src: "https://drive.google.com/file/d/1Kq7Fs06knX-6VOXQTs0hqphJ3Q3srCun/preview" },
        { episode: 8, title: "E' un pranzo al sacco?", src: "https://drive.google.com/file/d/1kLJ29kNZnz_RF5NDSXVJvSdWUHe6TC5J/preview" },
        { episode: 9, title: "E' il momento del mio assolo", src: "https://drive.google.com/file/d/1-1Au2tWQIj37QW_PFj3mG71i_k4YS3Rc/preview" },
        { episode: 10, title: "Mostri", src: "https://drive.google.com/file/d/1jv_pet7AY2Yvrwa0-HmZc_GRGcEeu01o/preview" }
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
];

const moviesList = [
"Il buco: Capitolo 2": {
    img: "https://i.imgur.com/dezd4Vb.jpeg",
    src: "https://drive.google.com/file/d/1WVhXNNE26fbIbweJ-Zk5RzBIQSSolr2t/preview"
  },
  "Harry Potter e i doni della morte: I parte": {
    img: "https://i.imgur.com/4q0eRaQ.jpeg",
    src: "https://drive.google.com/file/d/1Rfr4vh6xVEoG5f-WMeeQyoChIGInwQAt/preview"
  },
  "Harry Potter e la pietra filosofale": {
    img: "https://i.imgur.com/JzHMob8.jpeg",
    src: "https://drive.google.com/file/d/1lZamFnz4DXuillwY-t8QcBs_LqmL5d-O/preview"
  },
  "Harry Potter e i doni della morte: II parte": {
    img: "https://i.imgur.com/JzHMob8.jpeg",
    src: "https://drive.google.com/file/d/1lZamFnz4DXuillwY-t8QcBs_LqmL5d-O/preview"
  },
"Harry Potter e la camera dei segreti": {
    img: "https://i.imgur.com/DuO9Dy4.jpeg",
    src: "https://drive.google.com/file/d/1lZamFnz4DXuillwY-t8QcBs_LqmL5d-O/preview"
  },
"Harry Potter e il prigioniero di Azkaban": {
    img: "https://i.imgur.com/JzHMob8.jpeg",
    src: "https://drive.google.com/file/d/1lZamFnz4DXuillwY-t8QcBs_LqmL5d-O/preview"
  },
"Harry Potter e il calice di fuoco": {
    img: "https://i.imgur.com/JzHMob8.jpeg",
    src: "https://drive.google.com/file/d/1lZamFnz4DXuillwY-t8QcBs_LqmL5d-O/preview"
  },
"Harry Potter e l'Ordine della Fenice": {
    img: "https://i.imgur.com/JzHMob8.jpeg",
    src: "https://drive.google.com/file/d/1lZamFnz4DXuillwY-t8QcBs_LqmL5d-O/preview"
  },
"Harry Potter e il principe mezzosangue": {
    img: "https://i.imgur.com/JzHMob8.jpeg",
    src: "https://drive.google.com/file/d/1lZamFnz4DXuillwY-t8QcBs_LqmL5d-O/preview"
  }
];

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

  const limitedSeries = seriesList.slice(0, maxItems);
  const limitedMovies = moviesList.slice(0, maxItems);

  limitedSeries.forEach((serie) => {
    const card = createCard(serie);
    seriesContainer.appendChild(card);
  });

  limitedMovies.forEach((movie) => {
    const card = createCard(movie);
    moviesContainer.appendChild(card);
  });
}

function createCard(item) {
  const card = document.createElement("div");
  card.className = "card";

  const img = document.createElement("img");
  img.src = item.image;
  img.alt = item.title;
  card.appendChild(img);

  const title = document.createElement("p");
  title.textContent = item.title;
  card.appendChild(title);

  card.onclick = () => {
    if (item.seasons) {
      showSeasons(item);
    } else {
      playVideo(item);
    }
  };

  return card;
}

function showSeasons(series) {
  document.getElementById("home-view").style.display = "none";
  document.getElementById("series-view").style.display = "block";
  document.getElementById("video-view").style.display = "none";

  const title = document.getElementById("episode-title");
  title.textContent = series.title;

  const listContainer = document.getElementById("episode-list");
  listContainer.innerHTML = "";

  series.seasons.forEach((season, seasonIndex) => {
    const seasonDiv = document.createElement("div");
    seasonDiv.className = "season";
    const seasonTitle = document.createElement("h3");
    seasonTitle.textContent = `Stagione ${seasonIndex + 1}`;
    seasonDiv.appendChild(seasonTitle);

    season.episodes.forEach((episode) => {
      const epDiv = document.createElement("div");
      epDiv.className = "episode";
      epDiv.textContent = episode.title;
      epDiv.onclick = () => playVideo(episode);
      seasonDiv.appendChild(epDiv);
    });

    listContainer.appendChild(seasonDiv);
  });
}

function playVideo(video) {
  document.getElementById("home-view").style.display = "none";
  document.getElementById("series-view").style.display = "none";
  document.getElementById("video-view").style.display = "block";

  const videoPlayer = document.getElementById("video-player");
  videoPlayer.src = video.url;
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

  items.forEach((item) => {
    const card = createCard(item);
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

  if (username === "admin" && password === "password") {
    showHome();
  } else {
    alert("Credenziali non valide");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  login();
});
