#include "brick_game/tetris/fms.h"
#include "common.h"

void setup(GameInfo_t *info) {
  initscr();
  clear();
  noecho();
  cbreak();
  keypad(stdscr, true);
  curs_set(false);
  timeout(info->speed);
}

int main(void) {
  int error = 0;
  GameInfo_t *info = getInfo();

  setup(info);
  error = init_info_field(info);
  if (!error) {
    while (info->level != -1) {
      userInput(Down, 1);
      game_loop();
      draw(*info);
      timeout(info->speed);
    }
  }
  clear_info(info);
  endwin();
  return 0;
}

void userInput(UserAction_t action, int hold) {
  State_t *state = getState();
  (void)hold;
  state->action = action;
  int ch = getch();
  if (ch != ERR) {
    switch (ch) {
      case KEY_LEFT:
        state->action = Left;
        break;
      case KEY_RIGHT:
        state->action = Right;
        break;
      case KEY_DOWN:
        state->action = Down;
        break;
      case ' ':
        state->action = Action;
        break;
      case 'q':
      case 'Q':
        state->action = Terminate;
        break;
      case 'p':
      case 'P':
        state->action = Pause;
        break;
      case 'e':
      case 'E':
        state->action = Start;
        break;
    }
  }
};