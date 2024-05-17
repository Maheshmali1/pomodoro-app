let minutes = 1;
let seconds = 5;
let paused = false;
let timerIntervalId;
let pomodoroCompleted = 0;
let breakTime = false;

let startBtn = document.getElementById("start-btn");
let pauseBtn = document.getElementById("pause-btn");
let resetBtn = document.getElementById("reset-btn");
let resumeBtn = document.getElementById("resume-btn");
let timer = document.querySelector(".pomodoro-counter");
let pomodoroCount = document.getElementById('pomodoro-count');
let pomodoroTextEle = document.getElementById('pomodoro-text');


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
  timer.innerHTML = `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds
    }`;
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
      pomodoroCompleted++;
      pomodoroCount.innerHTML = pomodoroCompleted;
      clearInterval(timerIntervalId);

      if (!breakTime) {
        minutes = 5;
        seconds = 0;
        startTimer();
        breakTime = true;
        pomodoroTextEle.innerHTML = "It's Break Time!!";
      }
      else {
        minutes = 25;
        seconds = 0;
        breakTime = false;
        pomodoroTextEle.innerHTML = "Click start for new Work Timer!";
      }
    }
    else {
      timer.innerHTML = `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds
        }`;
    }
  }, 1000)
}