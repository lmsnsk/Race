const field = document.querySelector(".field");
const scoreField = document.querySelector("#score");
const highScoreField = document.querySelector("#high-score");
const levelField = document.querySelector("#level");

const host = "http://localhost:3000/";

let gameSpeed;
let intervalId;

const getData = async (cmd) => {
  try {
    const response = await fetch(host, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cmd }),
    });
    return await response.json();
  } catch (er) {
    console.error(er);
  }
};

const intervalFn = async () => {
  const data = await getData("ArrowUp");
  draw(data);

  if (intervalId && gameSpeed !== data.speed) {
    clearInterval(intervalId);
    intervalId = setInterval(intervalFn, data.speed);
  }
  if (
    intervalId &&
    data.level === -1 &&
    !document.querySelector(".game-over-msg")
  ) {
    clearInterval(intervalId);
    drawGameOver();
    intervalId = 0;
  }
  if (data.pause && !document.querySelector(".pause-msg") && data.level >= 0) {
    drawPause();
  }

  gameSpeed = data.speed;
};

const pressKeyHandler = async (event) => {
  if (
    event.key === "ArrowLeft" ||
    event.key === "ArrowRight" ||
    event.key === "ArrowUp" ||
    event.key === "ArrowDown" ||
    event.key === " " ||
    event.key === "q" ||
    event.key === "Q" ||
    event.key === "e" ||
    event.key === "E" ||
    event.key === "p" ||
    event.key === "P"
  ) {
    const data = await getData(event.key);

    if (
      event.key === "e" ||
      event.key === "E" ||
      event.key === "q" ||
      event.key === "Q"
    ) {
      if (event.key === "e" || event.key === "E") {
        let isStarted = document.querySelector(".start-msg");
        if (isStarted) isStarted.remove();
      }
      let isGameOver = document.querySelector(".game-over-msg");
      if (isGameOver) isGameOver.remove();
    }
    if (event.key === "p" || event.key === "P") {
      let isPaused = document.querySelector(".pause-msg");
      if (isPaused) isPaused.remove();
    }

    draw(data);

    if (event.key === "q" || event.key === "Q") {
      restart();
    }

    if (!intervalId && event.key !== "p" && event.key !== "P") {
      intervalId = setInterval(intervalFn, data.speed);
      gameSpeed = data.speed;
    }
  }
};

const draw = (data) => {
  let cell = document.querySelector(".cell");
  let temp = field.firstChild;

  data.field.forEach((line) => {
    line.forEach((element) => {
      if (!cell || !cell.nextElementSibling) {
        cell = document.createElement("div");
        field.append(cell);
      } else {
        cell = temp;
        temp = cell.nextElementSibling;
      }
      cell.className = `cell${element ? " full-cell" : ""}`;
    });
  });

  scoreField.innerText = `Score: ${data.score}`;
  highScoreField.innerText = `High score: ${data.high_score}`;
  if (data.level >= 0) levelField.innerText = `Level: ${data.level}`;
};

function drawGameOver() {
  const gameOverMsg = document.createElement("div");
  field.append(gameOverMsg);
  gameOverMsg.className = "msg game-over-msg";
  gameOverMsg.innerText = "GAME OVER Press E to restart";
}

function restart() {
  if (!document.querySelector(".start-msg")) {
    const startMsg = document.createElement("div");
    field.append(startMsg);
    startMsg.className = "msg start-msg";
    startMsg.innerText = "Press E to start game";
  }
  let isPaused = document.querySelector(".pause-msg");
  if (isPaused) isPaused.remove();
}

function drawPause() {
  const pauseMsg = document.createElement("div");
  field.append(pauseMsg);
  pauseMsg.className = "msg pause-msg";
  pauseMsg.innerText = "PAUSE";
}

const setStartValues = async () => {
  const data = await getData("");
  highScoreField.innerText = `High score: ${data.high_score}`;
  const startMsg = document.createElement("div");
  field.append(startMsg);
  startMsg.className = "msg start-msg";
  startMsg.innerText = "Press E to start game";
};

setStartValues();
document.addEventListener("keydown", pressKeyHandler);
