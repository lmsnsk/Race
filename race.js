var fs = require("fs");
var UserAction_t;
(function (UserAction_t) {
    UserAction_t[UserAction_t["Start"] = 0] = "Start";
    UserAction_t[UserAction_t["Pause"] = 1] = "Pause";
    UserAction_t[UserAction_t["Terminate"] = 2] = "Terminate";
    UserAction_t[UserAction_t["Left"] = 3] = "Left";
    UserAction_t[UserAction_t["Right"] = 4] = "Right";
    UserAction_t[UserAction_t["Up"] = 5] = "Up";
    UserAction_t[UserAction_t["Down"] = 6] = "Down";
    UserAction_t[UserAction_t["Action"] = 7] = "Action";
})(UserAction_t || (UserAction_t = {}));
var StateStatus_t;
(function (StateStatus_t) {
    StateStatus_t[StateStatus_t["START"] = 0] = "START";
    StateStatus_t[StateStatus_t["PAUSE"] = 1] = "PAUSE";
    StateStatus_t[StateStatus_t["SPAWN"] = 2] = "SPAWN";
    StateStatus_t[StateStatus_t["SHIFT"] = 3] = "SHIFT";
    StateStatus_t[StateStatus_t["STEP"] = 4] = "STEP";
    StateStatus_t[StateStatus_t["GAME_OVER"] = 5] = "GAME_OVER";
})(StateStatus_t || (StateStatus_t = {}));
var ROWS = 20;
var COLUMNS = 10;
var CELL = 1;
var ECELL = 1;
var MAX_ENEMIES = 2;
var ENEMY_STEP = 14;
var Race = /** @class */ (function () {
    function Race() {
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
    Race.prototype.shift = function (direction) {
        if (direction === UserAction_t.Left && this.state.x > 0) {
            this.state.x -= 1;
        }
        else if (direction === UserAction_t.Right && this.state.x < COLUMNS - 3) {
            this.state.x += 1;
        }
        this.updateField();
    };
    Race.prototype.fillField = function () {
        for (var i = 0; i < ROWS; i++) {
            this.state.field[i] = Array(COLUMNS);
            for (var j = 0; j < COLUMNS; j++) {
                this.state.field[i][j] = 0;
            }
        }
    };
    Race.prototype.initCar = function () {
        this.state.car[0] = [CELL, CELL, CELL];
        this.state.car[1] = [0, CELL, 0];
        this.state.car[2] = [CELL, CELL, CELL];
        this.state.car[3] = [0, CELL, 0];
        this.state.x = 3;
        this.state.y = 0;
    };
    Race.prototype.initEnemyCar = function () {
        this.state.enemy[0] = [0, ECELL, 0];
        this.state.enemy[1] = [ECELL, ECELL, ECELL];
        this.state.enemy[2] = [0, ECELL, 0];
        this.state.enemy[3] = [ECELL, ECELL, ECELL];
        this.state.enemy[4] = [0, ECELL, 0];
        for (var i = 0; i < MAX_ENEMIES; i++) {
            this.state.enemeis[i] = { x: 0, y: -5 };
        }
    };
    Race.prototype.readHighScore = function () {
        var _this = this;
        var filePath = "race_score.txt";
        fs.open(filePath, "r", function (err, fd) {
            if (err) {
                if (err.code === "ENOENT") {
                    console.error("File does not exist");
                    return;
                }
                throw err;
            }
            try {
                console.log(fd);
                _this.state.high_score = fd;
            }
            finally {
                fs.close(fd, function (err) {
                    if (err)
                        throw err;
                });
            }
        });
    };
    Race.prototype.saveHighScore = function () {
        fs.writeFileSync("race_score.txt", this.state.score.toString());
    };
    Race.prototype.spawnEnemy = function () {
        var random = Math.round(Math.random() * (COLUMNS - 3));
        this.state.enemeis[this.state.enemyNum] = { x: random, y: -5 };
        this.state.enemyNum =
            this.state.enemyNum === MAX_ENEMIES - 1 ? 0 : this.state.enemyNum + 1;
        this.changeScore();
    };
    Race.prototype.changeScore = function () {
        this.state.score += 1;
        if (this.state.score > this.state.high_score) {
            this.saveHighScore();
        }
        if (this.state.score % 15 == 0 && this.state.level <= 10) {
            this.state.level += 1;
            this.state.speed -= this.state.speed * 0.1;
        }
    };
    Race.prototype.step = function () {
        for (var i = 0; i < this.state.numberOfEnemy; i++) {
            if (this.state.enemeis[i].y < ROWS + 1)
                this.state.enemeis[i].y += 1;
        }
        if (this.state.gameCounter % ENEMY_STEP === 0) {
            if (this.state.numberOfEnemy < MAX_ENEMIES)
                this.state.numberOfEnemy += 1;
            this.spawnEnemy();
        }
        this.state.gameCounter += 1;
    };
    Race.prototype.updateCar = function () {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 3; j++) {
                if (this.state.car[i][j] === CELL)
                    this.state.field[ROWS - i - this.state.y - 1][j + this.state.x] =
                        CELL;
            }
        }
    };
    Race.prototype.checkCollision = function (i, j, k) {
        if (this.state.field[i + this.state.enemeis[k].y][j + this.state.enemeis[k].x] === CELL) {
            this.state.gameOver = true;
        }
    };
    Race.prototype.updateField = function () {
        this.fillField();
        this.updateCar();
        for (var k = 0; k < MAX_ENEMIES; k++) {
            for (var i = 0; i < 5; i++) {
                for (var j = 0; j < 3; j++) {
                    if (this.state.enemy[i][j] === ECELL &&
                        i + this.state.enemeis[k].y < ROWS &&
                        i + this.state.enemeis[k].y >= 0) {
                        this.checkCollision(i, j, k);
                        this.state.field[i + this.state.enemeis[k].y][j + this.state.enemeis[k].x] = ECELL;
                    }
                }
            }
        }
    };
    return Race;
}());
// const data = fs.readFileSync("1.txt");
// console.log(data.toString());
// data.then(console.log());
var race = new Race();
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
