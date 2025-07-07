# MiniNetflix Responsive

MiniNetflix è una semplice web app di streaming video con:

- Autenticazione base (username e password fittizi).
- Visualizzazione di due sezioni: Film e Serie TV.
- Player video con Video.js.
- Cronologia dei video guardati salvata in localStorage per utente.
- Layout responsive e sidebar di navigazione.

---

## Setup

1. Modifica `script.js` sostituendo gli ID Google Drive con i tuoi file video:

   ```js
   const films = [
     {
       title: "Film Google Drive 1",
       src: "https://drive.google.com/uc?export=download&id=ID_FILE_1",
       type: "video/mp4"
     },
     ...
   ];
