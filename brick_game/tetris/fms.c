#include "fms.h"

void game_loop() {
  GameInfo_t *info = getInfo();
  State_t *state = getState();

  if (state->action == Terminate) {
    state->level = -1;
    updateCurrentState();
    return;
  }

  if (state->stateStatus == START) start_game();

  if (state->stateStatus == SPAWN) spawn_figure(state->action);

  if (state->stateStatus == SHIFT) shift();

  if (state->stateStatus == PAUSE) game_pause(state);

  if (state->stateStatus == STEP) step(info);

  if (state->stateStatus == ATTACH) attachFigure();

  if (state->stateStatus == GAME_OVER) game_over(state);
};

void shift() {
  State_t *state = getState();
  if (state->action == Pause) {
    state->action = Down;
    state->stateStatus = PAUSE;
    state->pause = 1;
  } else {
    shift_figure();
    state->stateStatus = STEP;
  }
}

void start_game() {
  State_t *state = getState();
  init_state(state);
  updateCurrentState();
  if (state->action == Start) state->stateStatus = SPAWN;
}

void game_pause(State_t *state) {
  if (state->action == Pause) {
    state->pause = 0;
    state->stateStatus = SHIFT;
  }
}

void step() {
  step_down();
  updateCurrentState();
}

void game_over(State_t *state) {
  state->level = -1;
  updateCurrentState();
}

GameInfo_t updateCurrentState() {
  GameInfo_t *info = getInfo();
  State_t *state = getState();
  copy_field_to_info(info, state);
  info->high_score = state->high_score;
  info->pause = state->pause;
  info->score = state->score;
  info->speed = state->speed;
  info->level = state->level;
  return *info;
};

State_t *getState() {
  static State_t state;
  return &state;
}

void copy_field_to_info(GameInfo_t *info, State_t *state) {
  for (int i = 0; i < ROWS; i++) {
    for (int j = 0; j < COLUMNS; j++) {
      info->field[i][j] = state->field[i][j];

      if (i < FIG_SIZE && j < FIG_SIZE) {
        info->next[i][j] = state->next[i][j];
      }
    }
  }
}

int init_info_field(GameInfo_t *info) {
  int error = 0;
  info->field = (int **)calloc(ROWS, sizeof(int *));
  info->next = (int **)calloc(FIG_SIZE, sizeof(int *));
  if (!info->field || !info->next) {
    error = 1;
  } else {
    for (int i = 0; i < ROWS; i++) {
      info->field[i] = (int *)calloc(ROWS, sizeof(int));
      if (!info->field[i]) error = 1;
    }
    for (int i = 0; i < FIG_SIZE; i++) {
      info->next[i] = (int *)calloc(FIG_SIZE, sizeof(int));
      if (!info->next[i]) error = 1;
    }
  }
  info->level = 1;
  info->score = -1;
  return error;
}

void clear_info(GameInfo_t *info) {
  for (int i = 0; i < ROWS; i++) free(info->field[i]);
  for (int i = 0; i < FIG_SIZE; i++) free(info->next[i]);
  free(info->field);
  free(info->next);
}

GameInfo_t *getInfo() {
  static GameInfo_t info;
  return &info;
}