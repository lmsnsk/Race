const field = document.querySelector(".field");
const scoreField = document.querySelector("#score");
const highScoreField = document.querySelector("#high-score");
const levelField = document.querySelector("#level");

const array = [
  [0, 0, 0, 0, 1, 0, 0, 1, 1, 0],
  [0, 0, 0, 0, 1, 0, 0, 1, 1, 0],
  [0, 0, 0, 0, 1, 0, 0, 1, 1, 0],
  [0, 0, 0, 0, 1, 0, 0, 1, 1, 0],
  [0, 0, 0, 0, 1, 0, 0, 1, 1, 0],
  [0, 0, 0, 0, 1, 0, 0, 1, 1, 0],
  [0, 0, 0, 0, 1, 0, 0, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
  [0, 0, 1, 0, 1, 0, 0, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
  [0, 0, 0, 0, 1, 0, 0, 1, 1, 0],
  [0, 0, 0, 0, 1, 0, 0, 1, 1, 0],
  [0, 0, 0, 0, 1, 0, 0, 1, 1, 0],
  [0, 0, 0, 0, 1, 0, 0, 1, 1, 0],
  [0, 0, 0, 0, 1, 0, 1, 1, 1, 0],
  [0, 0, 0, 0, 1, 0, 0, 1, 1, 0],
  [0, 0, 0, 0, 1, 0, 0, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
];

const GameInfo_t = {
  field: array,
  next: [],
  score: 0,
  high_score: 0,
  level: 1,
  speed: 400,
  pause: 0,
};

const draw = (GameInfo_t) => {
  GameInfo_t.field.forEach((line) => {
    line.forEach((element) => {
      const cell = document.createElement("div");
      field.append(cell);
      cell.className = `cell${element ? " full-cell" : ""}`;
    });
  });
  const score = document.createElement("p");
  const highScore = document.createElement("p");
  const level = document.createElement("p");

  scoreField.append(score);
  highScoreField.append(highScore);
  levelField.append(level);

  score.innerText = GameInfo_t.score;
  highScore.innerText = GameInfo_t.high_score;
  level.innerText = GameInfo_t.level;
};

draw(GameInfo_t);
