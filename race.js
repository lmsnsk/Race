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
const CELL = " "; // код символа * - 42

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
  constructor() {
    this.initField();
    this.initCar();
  }

  car;
  enemy;
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
    this.car = Array(4);
    this.car[0] = [CELL, CELL, CELL];
    this.car[1] = [0, CELL, 0];
    this.car[2] = [CELL, CELL, CELL];
    this.car[3] = [0, CELL, 0];
    this.x = 3;
    this.y = 2;
  }

  initEnemyCar() {
    this.enemy = Array(5);
    this.enemy[0] = [0, CELL, 0];
    this.enemy[1] = [CELL, CELL, CELL];
    this.enemy[2] = [0, CELL, 0];
    this.enemy[3] = [CELL, CELL, CELL];
    this.enemy[4] = [0, CELL, 0];
  }

  updateField() {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (this.car[i][j] === CELL)
          this.state[ROWS - i - this.y - 1][j + this.x] = CELL;
      }
    }
  }
}

const race = new Race();
race.updateField();

for (let i = 0; i < ROWS; i++) {
  let out = null;
  for (let j = 0; j < COLUMNS; j++) {
    if (out === null) out = race.state[i][j] + " ";
    else out += race.state[i][j] + " ";
  }
  console.log(out);
}
