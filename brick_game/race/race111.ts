const fs = require("fs");

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
    this.state = {
      field: [[]],
      car: [],
      enemy: [],
      enemeis: [],
      score: 0,
      high_score: 0,
      level: 1,
      speed: 200,
      pause: 0,
      x: 3,
      y: 0,
      firstStep: 0,
      enemyNum: 0,
      gameOver: false,
      gameCounter: 0,
      numberOfEnemy: 0,
      action: 0,
      stateStatus: 0,
    };
    this.initCar();
    this.fillField();
    this.initEnemyCar();
    this.readHighScore();
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
    this.updateField();
  }

  fillField(): void {
    for (let i = 0; i < ROWS; i++) {
      this.state.field[i] = Array(COLUMNS);
      for (let j = 0; j < COLUMNS; j++) {
        this.state.field[i][j] = 0;
      }
    }
  }

  initCar(): void {
    this.state.car[0] = [CELL, CELL, CELL];
    this.state.car[1] = [0, CELL, 0];
    this.state.car[2] = [CELL, CELL, CELL];
    this.state.car[3] = [0, CELL, 0];
    this.state.x = 3;
    this.state.y = 0;
  }

  initEnemyCar(): void {
    this.state.enemy[0] = [0, ECELL, 0];
    this.state.enemy[1] = [ECELL, ECELL, ECELL];
    this.state.enemy[2] = [0, ECELL, 0];
    this.state.enemy[3] = [ECELL, ECELL, ECELL];
    this.state.enemy[4] = [0, ECELL, 0];
    for (let i = 0; i < MAX_ENEMIES; i++) {
      this.state.enemeis[i] = { x: 0, y: -5 };
    }
  }

  readHighScore() {
    const filePath = "race_score.txt";
    fs.open(filePath, "r", (err: any, fd: number) => {
      if (err) {
        if (err.code === "ENOENT") {
          console.error("File does not exist");
          return;
        }
        throw err;
      }
      try {
        console.log(fd);
        this.state.high_score = fd;
      } finally {
        fs.close(fd, (err: any) => {
          if (err) throw err;
        });
      }
    });
  }

  saveHighScore() {
    fs.writeFileSync("race_score.txt", this.state.score.toString());
  }

  spawnEnemy(): void {
    let random: number = Math.round(Math.random() * (COLUMNS - 3));
    this.state.enemeis[this.state.enemyNum] = { x: random, y: -5 };
    this.state.enemyNum =
      this.state.enemyNum === MAX_ENEMIES - 1 ? 0 : this.state.enemyNum + 1;
    this.changeScore();
  }

  changeScore(): void {
    this.state.score += 1;
    if (this.state.score > this.state.high_score) {
      this.saveHighScore();
    }
    if (this.state.score % 15 == 0 && this.state.level <= 10) {
      this.state.level += 1;
      this.state.speed -= this.state.speed * 0.1;
    }
  }

  step(): void {
    for (let i = 0; i < this.state.numberOfEnemy; i++) {
      if (this.state.enemeis[i].y < ROWS + 1) this.state.enemeis[i].y += 1;
    }
    if (this.state.gameCounter % ENEMY_STEP === 0) {
      if (this.state.numberOfEnemy < MAX_ENEMIES) this.state.numberOfEnemy += 1;
      this.spawnEnemy();
    }
    this.state.gameCounter += 1;
  }

  updateCar(): void {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.state.car[i][j] === CELL)
          this.state.field[ROWS - i - this.state.y - 1][j + this.state.x] =
            CELL;
      }
    }
  }

  checkCollision(i: number, j: number, k: number): void {
    if (
      this.state.field[i + this.state.enemeis[k].y][
        j + this.state.enemeis[k].x
      ] === CELL
    ) {
      this.state.gameOver = true;
    }
  }

  updateField(): void {
    this.fillField();
    this.updateCar();
    for (let k = 0; k < MAX_ENEMIES; k++) {
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 3; j++) {
          if (
            this.state.enemy[i][j] === ECELL &&
            i + this.state.enemeis[k].y < ROWS &&
            i + this.state.enemeis[k].y >= 0
          ) {
            this.checkCollision(i, j, k);
            this.state.field[i + this.state.enemeis[k].y][
              j + this.state.enemeis[k].x
            ] = ECELL;
          }
        }
      }
    }
  }

  // end
}

// const data = fs.readFileSync("1.txt");
// console.log(data.toString());
// data.then(console.log());

const race = new Race();
console.log(race.state.high_score);
// const a = 16;
// for (let i = 0; i < a; i++) race.step();
// race.updateField();

// if (!race.state.gameOver) {
//   for (let i = 0; i < ROWS; i++) {
//     let out: string = "null";
//     for (let j = 0; j < COLUMNS; j++) {
//       if (out === "null") out = race.state.field[i][j] + " ";
//       else out += race.state.field[i][j] + " ";
//     }
//     console.log(out);
//   }
// } else {
//   console.log("GAME OVER");
// }
