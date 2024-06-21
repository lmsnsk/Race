import Race from "./race.js";

const race = new Race();

const updateCurrentState = () => {
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

  return info;
};

export const move = () => {
  race.step();
  return updateCurrentState();
};

// console.log(move());
