const field = document.querySelector(".field");
const scoreField = document.querySelector("#score");
const highScoreField = document.querySelector("#high-score");
const levelField = document.querySelector("#level");

const host = "http://localhost:3000/";

let gameSpeed;
let intervalId;

const intervalFn = async () => {
  const data = await getData("ArrowUp");
  draw(data);

  if (intervalId && gameSpeed !== data.speed) {
    clearInterval(intervalId);
    intervalId = setInterval(intervalFn, data.speed);
  }
  gameSpeed = data.speed;
};

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
    draw(data);
    if (!intervalId) {
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
  levelField.innerText = `Level: ${data.level}`;
};

document.addEventListener("keydown", pressKeyHandler);
