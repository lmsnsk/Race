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
const CELL = "."; // код символа * - 42
const ECELL = "_";
const NUMBEROFENEMY = 3;

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
    this.enemyNum = 0;
    this.initField();
    this.initCar();
    this.initEnemyCar();
    this.spawnEnemy();
  }

  car = Array(4);
  enemy = Array(5);
  state = Array(ROWS);
  enemeis = Array(3);
  enemyNum;
  x;
  y;

  shift(direction) {
    if (direction === Left && x > 0) x--;
    else if (direction === Right && x < COLUMNS - 3) x++;
  }

  checkCollision() {}

  initField() {
    for (let i = 0; i < ROWS; i++) {
      this.state[i] = Array(COLUMNS);
      for (let j = 0; j < COLUMNS; j++) {
        this.state[i][j] = 0;
      }
    }
  }

  spawnEnemy() {
    let random = Math.round(Math.random() * (COLUMNS - NUMBEROFENEMY));
    this.enemeis[this.enemyNum] = { x: random, y: -5 };
    this.enemyNum = this.enemyNum === NUMBEROFENEMY - 1 ? 0 : this.enemyNum + 1;
  }

  initCar() {
    this.car[0] = [CELL, CELL, CELL];
    this.car[1] = [0, CELL, 0];
    this.car[2] = [CELL, CELL, CELL];
    this.car[3] = [0, CELL, 0];
    this.x = 3;
    this.y = 1;
  }

  initEnemyCar() {
    this.enemy[0] = [0, ECELL, 0];
    this.enemy[1] = [ECELL, ECELL, ECELL];
    this.enemy[2] = [0, ECELL, 0];
    this.enemy[3] = [ECELL, ECELL, ECELL];
    this.enemy[4] = [0, ECELL, 0];
    for (let i = 0; i < NUMBEROFENEMY; i++) {
      this.enemeis[i] = { x: 0, y: -5 };
    }
  }

  updateField() {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.car[i][j] === CELL)
          this.state[ROWS - i - this.y - 1][j + this.x] = CELL;
      }
    }
    for (let k = 0; k < NUMBEROFENEMY; k++) {
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 3; j++) {
          if (
            this.enemy[i][j] === ECELL &&
            i + this.enemeis[k].y < ROWS &&
            i + this.enemeis[k].y >= 0 &&
            i + this.enemeis[k].x < COLUMNS &&
            i + this.enemeis[k].x >= 0
          )
            this.state[i + this.enemeis[k].y][j + this.enemeis[k].x] = CELL;
        }
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
