#include "common.h"
#include "fsm/fsm_race.hpp"

void setup();
void initInfoField(GameInfo_t *info);
void clearInfo(GameInfo_t *info);

int main(void) {
  GameInfo_t *info = getInfo();

  setup();
  initInfoField(info);
  updateCurrentState();

  while (info->level != -1) {
    gameLoop();
    timeout(info->speed);
  }

  clearInfo(info);
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
}

void initInfoField(GameInfo_t *info) {
  info->field = new int *[ROWS];
  info->next = new int *[FIG_SIZE];
  for (int i = 0; i < ROWS; i++) info->field[i] = new int[COLUMNS];
  for (int i = 0; i < FIG_SIZE; i++) info->next[i] = new int[FIG_SIZE];
  info->level = 1;
}

void clearInfo(GameInfo_t *info) {
  for (int i = 0; i < ROWS; i++) delete[] info->field[i];
  for (int i = 0; i < FIG_SIZE; i++) delete[] info->next[i];
  delete[] info->field;
  delete[] info->next;
}

GameInfo_t *getInfo() {
  static GameInfo_t info;
  return &info;
}