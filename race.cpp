#include "race.hpp"

Race::Race() {
  state.gameOver = false;
  state.enemyNum = 0;
  state.gameCounter = 0;
  state.numberOfEnemy = 0;
  initCar();
  initializeField();
  fillField();
  updateCar();
  initEnemyCar();
}

Race::~Race() { clearField(); };

void Race::shift(UserAction_t direction) {
  if (direction == Left && state.x > 0)
    state.x -= 1;
  else if (direction == Right && state.x < COLUMNS - 3)
    state.x += 1;
};

void Race::initializeField() {
  state.field = new int *[ROWS];
  for (int i = 0; i < ROWS; i++) {
    state.field[i] = new int[COLUMNS];
  };
};

void Race::clearField() {
  for (int i = 0; i < ROWS; i++) delete[] state.field[i];
  delete[] state.field;
};

void Race::fillField() {
  for (int i = 0; i < ROWS; i++) {
    for (int j = 0; j < COLUMNS; j++) {
      state.field[i][j] = 0;
    }
  }
};

void Race::initCar() {
  for (int i = 0; i < 3; i++) {
    state.car[0][i] = CELL;
    state.car[2][i] = CELL;
  }
  state.car[1][1] = CELL;
  state.car[3][1] = CELL;
  state.car[1][0] = 0;
  state.car[1][2] = 0;
  state.car[3][0] = 0;
  state.car[3][2] = 0;
  state.x = 3;
  state.y = 1;
};

void Race::initEnemyCar() {
  for (int i = 0; i < 3; i++) {
    state.enemy[1][i] = CELL;
    state.enemy[3][i] = CELL;
  }
  state.enemy[0][1] = CELL;
  state.enemy[2][1] = CELL;
  state.enemy[4][1] = CELL;
  state.enemy[0][0] = 0;
  state.enemy[0][2] = 0;
  state.enemy[2][0] = 0;
  state.enemy[2][2] = 0;
  state.enemy[4][2] = 0;
  state.enemy[4][2] = 0;
  for (int i = 0; i < MAX_ENEMIES; i++) {
    state.enemeis.push_back({0, -5});
  }
};

int Race::getRandomInt(int min, int max) {
  std::random_device rd;
  std::mt19937 gen(rd());
  std::uniform_int_distribution<> distrib(min, max);
  return distrib(gen);
};

void Race::spawnEnemy() {
  int random = getRandomInt(0, COLUMNS - 3);
  state.enemeis[state.enemyNum] = {random, -5};
  state.enemyNum =
      (state.enemyNum == MAX_ENEMIES - 1) ? 0 : (state.enemyNum + 1);
};

void Race::step() {
  for (int i = 0; i < state.numberOfEnemy; i++) {
    if (state.enemeis[i].y < ROWS + 1) state.enemeis[i].y += 1;
  }
  if (state.gameCounter % ENEMY_STEP == 0 || state.gameCounter == 0) {
    if (state.numberOfEnemy < MAX_ENEMIES) state.numberOfEnemy += 1;
    spawnEnemy();
  }
  state.gameCounter += 1;
};

void Race::updateCar() {
  for (int i = 0; i < 4; i++) {
    for (int j = 0; j < 3; j++) {
      if (state.car[i][j] == CELL)
        state.field[ROWS - i - state.y - 1][j + state.x] = CELL;
    }
  }
};

void Race::checkCollision(int i, int j, int k) {
  if (state.field[i + state.enemeis[k].y][j + state.enemeis[k].x] == CELL) {
    state.gameOver = true;
  }
};

void Race::updateField() {
  fillField();
  updateCar();
  for (int k = 0; k < MAX_ENEMIES; k++) {
    for (int i = 0; i < 5; i++) {
      for (int j = 0; j < 3; j++) {
        if (state.enemy[i][j] == CELL && i + state.enemeis[k].y < ROWS &&
            i + state.enemeis[k].y >= 0) {
          checkCollision(i, j, k);
          state.field[i + state.enemeis[k].y][j + state.enemeis[k].x] = CELL;
        }
      }
    }
  }
};

RaceState_t *Race::getState() { return &state; };

// int main() {
//   Race race;
//   int a = 22;
//   for (int i = 0; i < a; i++) race.step();
//   race.updateField();

//   if (!race.state.gameOver) {
//     for (int i = 0; i < ROWS; i++) {
//       for (int j = 0; j < COLUMNS; j++) {
//         std::cout << race.state.field[i][j];
//         std::cout << " ";
//       }
//       std::cout << std::endl;
//     }
//   } else {
//     std::cout << "GAME OVER" << std::endl;
//   }
//   return 0;
// }

Race *getRace() {
  static Race race;
  return &race;
}

void copyField(int **from, int **to) {
  for (int i = 0; i < ROWS; i++) {
    for (int j = 0; j < COLUMNS; j++) {
      to[i][j] = from[i][j];
    }
  }
};

GameInfo_t updateCurrentState() {
  GameInfo_t *info = getInfo();
  Race *race = getRace();
  RaceState_t *state = race->getState();
  // UserAction_t action = state->action;

  // if (action == Start && !state->start) {
  //   state->start = 1;
  // } else if (action == Pause) {
  //   state->pause = !state->pause;
  // } else if (!state->pause && state->start) {
  //   if (action == Left) {
  //     state->moveSnake(state, s21::LEFT);
  //   } else if (action == Right) {
  //     state->moveSnake(state, s21::RIGHT);
  //   } else if (action == Up) {
  //     state->moveSnake(state, s21::UP);
  //   } else if (action == Down) {
  //     state->moveSnake(state, s21::DOWN);
  //   } else {
  //     state->moveSnake(state, state->direction);
  //   }
  // }

  copyField(state->field, info->field);
  info->high_score = state->high_score;
  info->pause = state->pause;
  info->score = state->score;
  info->speed = state->speed;
  info->level = state->level;
  return *info;
};