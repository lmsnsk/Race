
#include <stdlib.h>

#include "common.h"
#include "gui/cli.h"
#include "race.hpp"

void setup();
void initInfoField(GameInfo_t *info);
void clearInfo(GameInfo_t *info);

int main(void) {
  UserAction_t status;
  GameInfo_t *info = getInfo();
  Race *race = getRace();

  setup();
  initInfoField(info);
  updateCurrentState();

  while (1) {
    timeout(400);  // speed
    status = getPressedKey();
    race->step();
    race->updateField();
    updateCurrentState();
    printField(*info);
  }

  clearInfo(info);
  (void)status;
  endwin();
  return 0;
}

void setup() {
  initscr();
  clear();
  noecho();
  cbreak();
  keypad(stdscr, true);
  curs_set(false);
  timeout(100);  // speed
}

void initInfoField(GameInfo_t *info) {
  info->field = new int *[ROWS];
  for (int i = 0; i < ROWS; i++) info->field[i] = new int[COLUMNS];
  info->level = 1;
}

void clearInfo(GameInfo_t *info) {
  for (int i = 0; i < ROWS; i++) delete[] info->field[i];
  delete[] info->field;
}

GameInfo_t *getInfo() {
  static GameInfo_t info;
  return &info;
}