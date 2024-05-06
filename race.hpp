#ifndef S21_RACE_H
#define S21_RACE_H

#include <iostream>
#include <random>
#include <vector>

#include "common.h"

const int MAX_ENEMIES = 2;
const int ENEMY_STEP = 14;
const int CELL = '*';

struct Coord_t {
  int x;
  int y;
};

struct RaceState_t {
  int** field;
  int car[4][3];
  int enemy[5][3];
  int score;
  std::vector<Coord_t> enemeis;
  int high_score;
  int enemyNum;
  int level;
  int speed;
  int pause;
  int x;
  int y;
  int gameCounter;
  int numberOfEnemy;
  bool gameOver;
  UserAction_t action;
};

class Race {
 public:
  RaceState_t state;

  RaceState_t* getState();

  Race();
  ~Race();

  void shift(UserAction_t direction);
  void initializeField();
  void clearField();
  void fillField();
  void initCar();
  void initEnemyCar();
  int getRandomInt(int min, int max);
  void spawnEnemy();
  void step();
  void updateCar();
  void checkCollision(int i, int j, int k);
  void updateField();

 private:
};

Race* getRace();
void copyField(int** from, int** to);
GameInfo_t updateCurrentState();

#endif  // S21_RACE_H