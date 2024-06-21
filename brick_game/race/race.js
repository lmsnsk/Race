// const fs = require("fs");

const CELL = 1;
const ROWS = 20;
const COLUMNS = 10;
const MAX_ENEMIES = 2;
const ENEMY_STEP = 14;

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
      pause: false,
      x: 3,
      y: 0,
      firstStep: false,
      enemyNum: 0,
      gameOver: false,
      gameCounter: 0,
      numberOfEnemy: 0,
      action: -1,
    };
    this.initCar();
    this.fillField();
    this.initEnemyCar();
    // this.readHighScore();
  }

  state;

  shift(direction) {
    if (direction === "<" && this.state.x > 0) {
      this.state.x -= 1;
    } else if (direction === ">" && this.state.x < COLUMNS - 3) {
      this.state.x += 1;
    }
    this.updateField();
  }

  fillField() {
    for (let i = 0; i < ROWS; i++) {
      this.state.field[i] = Array(COLUMNS);
      for (let j = 0; j < COLUMNS; j++) {
        this.state.field[i][j] = 0;
      }
    }
  }

  initCar() {
    this.state.car[0] = [CELL, CELL, CELL];
    this.state.car[1] = [0, CELL, 0];
    this.state.car[2] = [CELL, CELL, CELL];
    this.state.car[3] = [0, CELL, 0];
    this.state.x = 3;
    this.state.y = 0;
  }

  initEnemyCar() {
    this.state.enemy[0] = [0, CELL, 0];
    this.state.enemy[1] = [CELL, CELL, CELL];
    this.state.enemy[2] = [0, CELL, 0];
    this.state.enemy[3] = [CELL, CELL, CELL];
    this.state.enemy[4] = [0, CELL, 0];
    for (let i = 0; i < MAX_ENEMIES; i++) {
      this.state.enemeis[i] = { x: 0, y: -5 };
    }
  }

  readHighScore() {
    const filePath = "race_score.txt";
    fs.open(filePath, "r", (err, fd) => {
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
        fs.close(fd, (err) => {
          if (err) throw err;
        });
      }
    });
  }

  saveHighScore() {
    fs.writeFileSync("race_score.txt", this.state.score.toString());
  }

  spawnEnemy() {
    let random = Math.round(Math.random() * (COLUMNS - 3));
    this.state.enemeis[this.state.enemyNum] = { x: random, y: -5 };
    this.state.enemyNum =
      this.state.enemyNum === MAX_ENEMIES - 1 ? 0 : this.state.enemyNum + 1;
    this.changeScore();
  }

  changeScore() {
    this.state.score += 1;
    if (this.state.score > this.state.high_score) {
      //   this.saveHighScore();
    }
    if (this.state.score % 15 == 0 && this.state.level < 10) {
      this.state.level += 1;
      this.state.speed -= this.state.speed * 0.1;
    }
  }

  updateField() {
    this.fillField();
    this.updateCar();
    for (let k = 0; k < MAX_ENEMIES; k++) {
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 3; j++) {
          if (
            this.state.enemy[i][j] === CELL &&
            i + this.state.enemeis[k].y < ROWS &&
            i + this.state.enemeis[k].y >= 0
          ) {
            this.checkCollision(i, j, k);
            this.state.field[i + this.state.enemeis[k].y][
              j + this.state.enemeis[k].x
            ] = CELL;
          }
        }
      }
    }
  }

  step() {
    for (let i = 0; i < this.state.numberOfEnemy; i++) {
      if (this.state.enemeis[i].y < ROWS + 1) this.state.enemeis[i].y += 1;
    }
    if (this.state.gameCounter % ENEMY_STEP === 0) {
      if (this.state.numberOfEnemy < MAX_ENEMIES) this.state.numberOfEnemy += 1;
      this.spawnEnemy();
    }
    this.state.gameCounter += 1;
    this.updateField();
  }

  updateCar() {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.state.car[i][j] === CELL)
          this.state.field[ROWS - i - this.state.y - 1][j + this.state.x] =
            CELL;
      }
    }
  }

  checkCollision(i, j, k) {
    if (
      this.state.field[i + this.state.enemeis[k].y][
        j + this.state.enemeis[k].x
      ] === CELL
    ) {
      this.state.gameOver = true;
    }
  }

  // end
}

export default Race;
