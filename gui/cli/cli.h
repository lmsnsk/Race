#ifndef S21_BRICKGAME_CLI_H
#define S21_BRICKGAME_CLI_H

#include <ncurses.h>
#include <stdio.h>

#include "../../common.h"

void draw(GameInfo_t info);
void print_game(GameInfo_t* info);
void print_main_field(GameInfo_t* info);

#endif  // S21_BRICKGAME_CLI_H