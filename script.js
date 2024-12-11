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
  const endTime = document.querySelector(".end");
  const duration = audio.duration;
  let timeLength = timeFormat(duration);
  endTime.textContent = timeLength;
});

audio.addEventListener("timeupdate", () => {
  const startTime = document.querySelector(".start");
  const playingTime = audio.currentTime;
  let timeLength = timeFormat(playingTime);

  startTime.textContent = timeLength;
});

function timeFormat(time) {
  let min = Math.floor(time / 60);
  let sec = Math.floor(time % 60);

  return `${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`;
}

// Progressive seekbar
const seekbar = document.querySelector(".seekbar");

audio.addEventListener("timeupdate", () => {
  const running = audio.currentTime;
  const duration = audio.duration;
  let progress = ((running / duration) * 100).toFixed(2);

  if (running != duration) {
    seekbar.style.background = `linear-gradient(90deg, #52d7bf ${progress}%, #5e5a5a ${progress}%)`;
    seekbar.value = `${progress}`;
  } else {
    seekbar.style.background = `linear-gradient(90deg, #52d7bf 0%, #5e5a5a 0%)`;
    seekbar.value = `0`;
  }
});

// Foward backward
seekbar.addEventListener("input", () => {
  const duration = audio.duration;
  let newProgress = (seekbar.value / 100) * duration;
  audio.currentTime = newProgress;

  seekbar.style.background = `linear-gradient(90deg, #52d7bf ${seekbar.value}%, #5e5a5a ${seekbar.value}%)`;
});
