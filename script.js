const audio = document.querySelector("audio");

// Play/Pause button
const playPause = document.querySelector(".play img");

document.querySelector(".play").addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playPause.src = "/src/icons/Pause.png";
  } else {
    audio.pause();
    playPause.src = "/src/icons/Play.png";
  }
});

// Starting and ending time
audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;

  const endTime = document.querySelector(".end");
  const duration = audio.duration;
  let timeLength = timeFormat(duration);
  endTime.textContent = timeLength;
});

audio.addEventListener("timeupdate", () => {
  const startTime = document.querySelector(".start");
  const duration = audio.duration;
  const playingTime = audio.currentTime;
  let timeLength = timeFormat(playingTime);

  if (playingTime != duration) {
    startTime.textContent = timeLength;
  } else {
    startTime.textContent = "00:00";
  }
});

function timeFormat(time) {
  let min = Math.floor(time / 60);
  let sec = Math.floor(time % 60);

  return `${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`;
}

// repeat
const repeatBtn = document.querySelector(".repeat");
let repeat = true;

repeatBtn.addEventListener("click", () => {
  repeat = !repeat;
  repeatBtn.style.backgroundColor = repeat ? "" : "black";
});

// Progressive seekbar
const seekbar = document.querySelector(".seekbar");

audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;

  const running = audio.currentTime;
  const duration = audio.duration;
  let progress = ((running / duration) * 100).toFixed(2);

  if (running != duration) {
    seekbar.style.background = `linear-gradient(90deg, #52d7bf ${progress}%, #5e5a5a ${progress}%)`;
    seekbar.value = `${progress}`;
  } else {
    seekbar.style.background = `linear-gradient(90deg, #52d7bf 0%, #5e5a5a 0%)`;
    seekbar.value = `0`;
    if (repeat) {
      nextSong();
    } else {
      audio.pause();
    }
  }
});

// Foward backward
seekbar.addEventListener("input", () => {
  const duration = audio.duration;
  let newProgress = (seekbar.value / 100) * duration;
  audio.currentTime = newProgress;

  seekbar.style.background = `linear-gradient(90deg, #52d7bf ${seekbar.value}%, #5e5a5a ${seekbar.value}%)`;
});

// favourite
let favourite = false;

document.querySelector(".love").addEventListener("click", () => {
  let icon = document.querySelector(".love img");
  if (favourite === false) {
    favourite = true;
    icon.src = "/src/icons/heart.png";
  } else {
    favourite = false;
    icon.src = "/src/icons/heart.svg";
  }
});

// volume button
const volBtn = document.querySelector(".volume");
const volBar = document.querySelector(".volumebar");
const volRange = document.querySelector(".volrange");

volBtn.addEventListener("click", () => {
  let container = document.querySelector(".container");
  console.log(container);
  volBar.style.visibility = "visible";

  setTimeout(() => {
    volBar.style.visibility = "hidden";
  }, 5000);
});

// volume up down
volRange.addEventListener("input", () => {
  let volume = volRange.value / 100;
  audio.volume = volume;

  volRange.style.background = `linear-gradient(90deg, #52d7bf ${volRange.value}%, #5e5a5a ${volRange.value}%)`;
});

// Change songs
const next = document.querySelector(".next");

const songs = [
  {
    src: "/src/music/Apna Banale Piya.mp3",
    title: "Apna Banale Piya",
    artist: "Arijit Singh",
    cover: "src/images/banale.jpeg",
  },
  {
    src: "/src/music/Tu Jane Na.mp3",
    title: "Tu Jane Na",
    artist: "Atif Aslam",
    cover: "src/images/janena.jpeg",
  },
  {
    src: "/src/music/Mere Mehboob.mp3",
    title: "Mere Mehboob",
    artist: "Sanam",
    cover: "src/images/mehboob.jpeg",
  },
];
audio.pause();

let currentSong = 0;

audio.src = songs[currentSong].src;
audio.load();

next.addEventListener("click", () => {
  nextSong();
});

function nextSong() {
  const title = document.querySelector(".title");
  const singer = document.querySelector(".singer");
  const cover = document.querySelector(".cover img");

  currentSong = (currentSong + 1) % songs.length;

  audio.src = songs[currentSong].src;
  audio.load();
  audio.play();
  title.textContent = songs[currentSong].title;
  singer.textContent = songs[currentSong].artist;
  playPause.src = "/src/icons/Pause.png";
  cover.src = songs[currentSong].cover;
}
nextSong();

// previous song
const prev = document.querySelector(".prev");

prev.addEventListener("click", () => {
  prevSong();
});

function prevSong() {
  const title = document.querySelector(".title");
  const singer = document.querySelector(".singer");
  const cover = document.querySelector(".cover img");

  currentSong = (currentSong - 1 + songs.length) % songs.length;

  audio.src = songs[currentSong].src;
  audio.load();
  audio.play();
  title.textContent = songs[currentSong].title;
  singer.textContent = songs[currentSong].artist;
  playPause.src = "/src/icons/Pause.png";
  cover.src = songs[currentSong].cover;
}
prevSong();

// shuflle
let shuffle = false;

document.querySelector(".shuffle").addEventListener("click", () => {
  shuffle = !shuffle;
  // Toggle shuffle button style
});

function getNextSongIndex() {
  if (shuffle) {
    return Math.floor(Math.random() * songs.length);
  }
  return (currentSong + 1) % songs.length;
}
