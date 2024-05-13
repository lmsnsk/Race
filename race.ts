enum UserAction_t {
  Start,
  Pause,
  Terminate,
  Left,
  Right,
  Up,
  Down,
  Action,
}

enum StateStatus_t {
  START,
  PAUSE,
  SPAWN,
  SHIFT,
  STEP,
  GAME_OVER,
}

const ROWS = 20;
const COLUMNS = 10;
const CELL = 1;
const ECELL = 1;
const MAX_ENEMIES = 2;
const ENEMY_STEP = 14;

interface Coord_t {
  x: number;
  y: number;
}

interface GameInfo_t {
  field: Array<Array<number>>;
  next: Array<Array<number>>;
  score: number;
  high_score: number;
  level: number;
  speed: number;
  pause: number;
}

interface RaceState_t {
  field: Array<Array<number>>;
  car: Array<Array<number>>;
  enemy: Array<Array<number>>;
  enemeis: Array<Coord_t>;
  score: number;
  high_score: number;
  level: number;
  speed: number;
  pause: number;
  enemyNum: number;
  firstStep: number;
  x: number;
  y: number;
  gameCounter: number;
  numberOfEnemy: number;
  gameOver: boolean;
  action: UserAction_t;
  stateStatus: StateStatus_t;
}

class Race {
  constructor() {
    this.state.gameOver = false;
    this.state.enemyNum = 0;
    this.state.gameCounter = 0;
    this.state.numberOfEnemy = 0;
    this.state.stateStatus = 0;
    this.initCar();
    this.initializeField();
    this.initEnemyCar();
  }

  state: RaceState_t;

  // car: Array<Array<number>> = Array(4);
  // enemy: Array<Array<number>> = Array(5);
  // state: Array<Array<number>> = Array(ROWS);
  // enemeis: Array<Coord_t> = Array(3);
  // enemyNum: number;
  // x: number;
  // y: number;
  // status: UserAction_t;
  // gameCounter: number;
  // numberOfEnemy: number;
  // gameOver: boolean;

  shift(direction: UserAction_t): void {
    if (direction === UserAction_t.Left && this.state.x > 0) {
      this.state.x -= 1;
    } else if (direction === UserAction_t.Right && this.state.x < COLUMNS - 3) {
      this.state.x += 1;
    }
  }

  initializeField(): void {
    for (let i = 0; i < ROWS; i++) {
      this.state[i] = Array(COLUMNS);
      for (let j = 0; j < COLUMNS; j++) {
        this.state[i][j] = 0;
      }
    }
  }

  initCar(): void {
    this.car[0] = [CELL, CELL, CELL];
    this.car[1] = [0, CELL, 0];
    this.car[2] = [CELL, CELL, CELL];
    this.car[3] = [0, CELL, 0];
    this.x = 3;
    this.y = 1;
  }

  initEnemyCar(): void {
    this.enemy[0] = [0, ECELL, 0];
    this.enemy[1] = [ECELL, ECELL, ECELL];
    this.enemy[2] = [0, ECELL, 0];
    this.enemy[3] = [ECELL, ECELL, ECELL];
    this.enemy[4] = [0, ECELL, 0];
    for (let i = 0; i < MAX_ENEMIES; i++) {
      this.enemeis[i] = { x: 0, y: -5 };
    }
  }

  spawnEnemy(): void {
    let random: number = Math.round(Math.random() * (COLUMNS - 3));
    this.enemeis[this.enemyNum] = { x: random, y: -5 };
    this.enemyNum = this.enemyNum === MAX_ENEMIES - 1 ? 0 : this.enemyNum + 1;
  }

  step(): void {
    for (let i = 0; i < this.numberOfEnemy; i++) {
      if (this.enemeis[i].y < ROWS + 1) this.enemeis[i].y += 1;
    }
    if (this.gameCounter % ENEMY_STEP === 0 || this.gameCounter === 0) {
      if (this.numberOfEnemy < MAX_ENEMIES) this.numberOfEnemy += 1;
      this.spawnEnemy();
    }
    this.gameCounter += 1;
  }

  updateCar(): void {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.car[i][j] === CELL)
          this.state[ROWS - i - this.y - 1][j + this.x] = CELL;
      }
    }
  }

  checkCollision(i: number, j: number, k: number): void {
    if (this.state[i + this.enemeis[k].y][j + this.enemeis[k].x] === CELL) {
      this.gameOver = true;
    }
  }

  updateField(): void {
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
    let out: string = "null";
    for (let j = 0; j < COLUMNS; j++) {
      if (out === "null") out = race.state[i][j] + " ";
      else out += race.state[i][j] + " ";
    }
    console.log(out);
  }
} else {
  console.log("GAME OVER");
}
