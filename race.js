/*
enum {
  Start,
  Pause,
  Terminate,
  Left,
  Right,
  Up,
  Down,
  Action
};
*/
const ROWS = 20;
const COLUMNS = 10;
const CELL = 42; // код символа *

class GameInfo_t {
  field;
  next;
  score;
  high_score;
  level;
  speed;
  pause;
}

class GameState_t {
  field;
  next;
  score;
  high_score;
  level;
  speed;
  pause;
}

class Race {
  constructor() {}

  car;
  state;
  x;
  y;

  shift(direction) {
    if (direction === Left && x > 0) x--;
    else if (direction === Right && x < COLUMNS - 3) x++;
  }

  checkCollision() {}

  initField() {
    this.state = Array(ROWS);
    for (let i = 0; i < ROWS; i++) {
      this.state[i] = Array(COLUMNS);
      for (let j = 0; j < COLUMNS; j++) {
        this.state[i][j] = 0;
      }
    }
  }

  initCar() {
    this.car[0] = [CELL, CELL, CELL];
    this.car[1] = [0, CELL, 0];
    this.car[2] = [CELL, CELL, CELL];
    this.car[3] = [0, CELL, 0];
  }
}

const race = new Race();
race.initField();

for (let i = 0; i < ROWS; i++) {
  let out;
  for (let j = 0; j < COLUMNS; j++) {
    if (out === undefined) out = race.state[i][j] + " ";
    else out += race.state[i][j] + " ";
  }
  console.log(out);
}
