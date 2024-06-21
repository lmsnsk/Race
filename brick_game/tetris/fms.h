#ifndef S21_FMS_TETRIS_H
#define S21_FMS_TETRIS_H

#include "../../gui/cli/cli.h"
#include "tetris_model.h"

void game_loop();
void start_game();
void copy_field_to_info(GameInfo_t *info, State_t *state);
void getPressedKey();
void shift();
void game_pause(State_t *state);
void step();
void game_over(State_t *state);
void clear_info(GameInfo_t *info);
int init_info_field(GameInfo_t *info);

#endif  // S21_FMS_TETRIS_H