import Race from "./race.js";

let race = new Race();

const actionEnum = {
  START: 0,
  PAUSE: 1,
  SHIFT: 2,
  STEP: 3,
  GAME_OVER: 4,
  TERMINATE: 5,
  SKIP: 6,
};
Object.freeze(actionEnum);

///////////////
export function gameLoop(action) {
  userInput(action);

  if (race.state.action === actionEnum.TERMINATE) {
    terminate();
  } else if (race.state.action === actionEnum.PAUSE) {
    pause();
  } else if (race.state.action === actionEnum.START) {
    startGame();
  } else if (race.state.action === actionEnum.SHIFT) {
    shift(action);
  } else if (race.state.action === actionEnum.STEP) {
    step();
  }

  return updateCurrentState();
}
///////////////

function userInput(action) {
  switch (action) {
    case "e":
    case "E":
      race.state.action = actionEnum.START;
      break;
    case "p":
    case "P":
      race.state.action = actionEnum.PAUSE;
      break;
    case "q":
    case "Q":
      race.state.action = actionEnum.TERMINATE;
      break;
    case "ArrowUp":
      race.state.action = actionEnum.STEP;
      break;
    case "ArrowLeft":
      race.state.action = actionEnum.SHIFT;
      break;
    case "ArrowRight":
      race.state.action = actionEnum.SHIFT;
      break;
    case "ArrowDown":
      break;
    default:
      race.state.action = actionEnum.SKIP;
      break;
  }
}

function updateCurrentState() {
  const info = {
    field: [],
    next: [],
    score: 0,
    high_score: 0,
    level: 1,
    speed: 400,
    pause: 0,
  };
  info.field = race.state.field;
  info.score = race.state.score;
  info.high_score = race.state.high_score;
  info.level = race.state.level;
  info.speed = race.state.speed;
  info.pause = race.state.pause;
  return info;
}

function startGame() {
  race.state.firstStep = true;
}

function shift(action) {
  if (race.state.pause || !race.state.firstStep) return;
  race.shift(action === "ArrowRight" ? ">" : "<");
}

function step() {
  if (race.state.pause || !race.state.firstStep) return;
  race.step();
}

function pause() {
  if (race.state.action === actionEnum.PAUSE) {
    race.state.pause = !race.state.pause;
  }
}

function terminate() {
  race = new Race();
}
