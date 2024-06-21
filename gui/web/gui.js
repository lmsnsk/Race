const field = document.querySelector(".field");
const scoreField = document.querySelector("#score");
const highScoreField = document.querySelector("#high-score");
const levelField = document.querySelector("#level");

const host = "http://localhost:3000/";

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
    draw(await getData(event.key));
  }
};

const intervalFn = async () => {
  draw(await getData("ArrowUp"));
};

const draw = (data) => {
  const isWillRemove = document.querySelector(".field-helper");
  if (isWillRemove) isWillRemove.remove();

  const fieldHelper = document.createElement("div");
  fieldHelper.className = "field-helper";
  field.append(fieldHelper);

  data.field.forEach((line) => {
    line.forEach((element) => {
      const cell = document.createElement("div");
      cell.className = `cell${element ? " full-cell" : ""}`;
      fieldHelper.append(cell);
    });
  });
  scoreField.innerText = `Score: ${data.score}`;
  highScoreField.innerText = `High score: ${data.high_score}`;
  levelField.innerText = `Level: ${data.level}`;
};

document.addEventListener("keydown", pressKeyHandler);
// setInterval(intervalFn, 200);
