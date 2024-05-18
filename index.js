let minutes = 25;
let seconds = 0;
let paused = false;
let timerIntervalId;
let pomodoroCompleted = getWithTTL("pomodoroCompleted") || 0;
let breakTime = false;

let titleEle = document.getElementById("title");
let startBtn = document.getElementById("start-btn");
let pauseBtn = document.getElementById("pause-btn");
let resetBtn = document.getElementById("reset-btn");
let resumeBtn = document.getElementById("resume-btn");
let timer = document.querySelector(".pomodoro-counter");
let pomodoroCount = document.getElementById('pomodoro-count');
let pomodoroTextEle = document.getElementById('pomodoro-text');
let audio = document.getElementById("alert-sound");
pomodoroCount.innerHTML = pomodoroCompleted;

pomodoroTextEle.innerHTML = "Click start for Work Timer!";
startBtn.addEventListener("click", () => {
  minutes = 25;
  seconds = 0;
  startTimer();
});

pauseBtn.addEventListener("click", () => {
  if (paused) {
    startTimer();
    pauseBtn.innerHTML = "Pause";
  }
  else {
    clearInterval(timerIntervalId);
    pomodoroTextEle.innerHTML = "Timer Paused";
    pauseBtn.innerHTML = "Resume";
  }
  paused = !paused;
});

resetBtn.addEventListener("click", () => {
  minutes = 25;
  seconds = 0;
  const value = `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds
    }`;

  timer.innerHTML = value;
  titleEle.innerHTML = `Pomodoro App - ${value}`;
  clearInterval(timerIntervalId);
  pomodoroTextEle.innerHTML = "Click start for Work Timer!";
})


const startTimer = () => {
  pomodoroTextEle.innerHTML = `It's ${breakTime ? "Break Time!!" : "Work Time!!"}`;
  timerIntervalId = setInterval(() => {
    seconds--;
    if (seconds < 0) {
      seconds = 59;
      minutes--;
    }

    if (minutes < 0) {
      if (!breakTime) {
        clearInterval(timerIntervalId);
        pomodoroCompleted++;
        setWithTTL("pomodoroCompleted", pomodoroCompleted);
        pomodoroCount.innerHTML = pomodoroCompleted;
        audio.play();
        breakTime = true;
        pomodoroTextEle.innerHTML = "It's Break Time!!";

        minutes = 5;
        seconds = 0;
        startTimer();

      }
      else {
        minutes = 25;
        seconds = 0;
        breakTime = false;
        pomodoroTextEle.innerHTML = "Click start for new Work Timer!";
      }
    }
    else {
      const value = `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds
        }`;

      timer.innerHTML = value;
      titleEle.innerHTML = `Pomodoro App - ${value}`;
    }
  }, 1000)
}


function setWithTTL(key, value) {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + (24 * 60 * 60 * 1000)
  };
  localStorage.setItem(key, JSON.stringify(item));
}

function getWithTTL(key) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
}