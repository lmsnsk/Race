#ifndef S21_FSM_RACE_H
#define S21_FSM_RACE_H

#include "../brick_game/race/race.hpp"
#include "../gui/cli/cli.h"

void gameLoop();
void startGame(UserAction_t &status, StateStatus &stateStatus);
void shiftCar(UserAction_t &status, StateStatus &stateStatus);

#endif  // S21_FSM_RACE_H