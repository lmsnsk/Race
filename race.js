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
const CELL = "O"; // код символа * - 42
const ECELL = "#";
const MAX_ENEMIES = 2;
const ENEMY_STEP = 14;

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
    this.gameOver = false;
    this.enemyNum = 0;
    this.gameCounter = 0;
    this.numberOfEnemy = 0;
    this.initCar();
    this.initField();
    this.initEnemyCar();
  }

  car = Array(4);
  enemy = Array(5);
  state = Array(ROWS);
  enemeis = Array(3);
  enemyNum;
  x;
  y;
  status;
  gameCounter;
  numberOfEnemy;
  gameOver;

  shift(direction) {
    if (direction === Left && this.x > 0) this.x -= 1;
    else if (direction === Right && this.x < COLUMNS - 3) this.x += 1;
  }

  initField() {
    for (let i = 0; i < ROWS; i++) {
      this.state[i] = Array(COLUMNS);
      for (let j = 0; j < COLUMNS; j++) {
        this.state[i][j] = ".";
      }
    }
    this.updateCar();
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
    for (let i = 0; i < MAX_ENEMIES; i++) {
      this.enemeis[i] = { x: 0, y: -5 };
    }
  }

  spawnEnemy() {
    let random = Math.round(Math.random() * (COLUMNS - 3));
    this.enemeis[this.enemyNum] = { x: random, y: -5 };
    this.enemyNum = this.enemyNum === MAX_ENEMIES - 1 ? 0 : this.enemyNum + 1;
  }

  step() {
    for (let i = 0; i < this.numberOfEnemy; i++) {
      if (this.enemeis[i].y < ROWS + 1) this.enemeis[i].y += 1;
    }
    if (this.gameCounter % ENEMY_STEP === 0 || this.gameCounter === 0) {
      if (this.numberOfEnemy < MAX_ENEMIES) this.numberOfEnemy += 1;
      this.spawnEnemy();
    }
    this.gameCounter += 1;
  }

  updateCar() {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.car[i][j] === CELL)
          this.state[ROWS - i - this.y - 1][j + this.x] = CELL;
      }
    }
  }

  checkCollision(i, j, k) {
    if (this.state[i + this.enemeis[k].y][j + this.enemeis[k].x] === CELL) {
      this.gameOver = true;
    }
  }

  updateField() {
    for (let k = 0; k < MAX_ENEMIES; k++) {
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 3; j++) {
          if (
            this.enemy[i][j] === ECELL &&
            i + this.enemeis[k].y < ROWS &&
            i + this.enemeis[k].y >= 0
          ) {
            this.checkCollision(i, j, k);
            this.state[i + this.enemeis[k].y][j + this.enemeis[k].x] = ECELL;
          }
        }
      }
    }
  }
}

const race = new Race();
const a = 22;
for (let i = 0; i < a; i++) race.step();
race.updateField();

if (!race.gameOver) {
  for (let i = 0; i < ROWS; i++) {
    let out = null;
    for (let j = 0; j < COLUMNS; j++) {
      if (out === null) out = race.state[i][j] + " ";
      else out += race.state[i][j] + " ";
    }
    console.log(out);
  }
} else {
  console.log("GAME OVER");
}
