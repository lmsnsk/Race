#include "fsm_race.hpp"

void gameLoop(UserAction_t &status) {
  Race *race = getRace();
  GameInfo_t *info = getInfo();

  if (race->getState()->stateStatus == START) {
    ;
  }
  if (race->getState()->stateStatus == SPAWN) {
    spawnEnemy();
  }
  if (race->getState()->stateStatus == SHIFT) {
    ;
  }
  if (race->getState()->stateStatus == STEP) {
    ;
  }
  if (race->getState()->stateStatus == END) {
    ;
  }

  status = getPressedKey();
  race->step();
  race->updateField();
  updateCurrentState();
  draw(*info);
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