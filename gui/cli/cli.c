#include "cli.h"

void draw(GameInfo_t info) {
  clear();
  print_game(&info);
  refresh();
};

void print_game(GameInfo_t* info) {
  printw("\nSCORE: %d\t\tLEVEL:%d\n", info->score == -1 ? 0 : info->score,
         info->level);
  printw("HIGH SCORE: %d\n\n", info->high_score);

  printw("NEXT FIGURE:");
  for (int i = 0; i < FIG_SIZE; i++) {
    for (int j = 0; j < FIG_SIZE; j++) {
      if (info->next[FIG_SIZE - i - 1][j] == 0)
        printw("   ");
      else
        printw("[o]");
    }
    printw("\n");
  }
  printw("\n");

  if (info->pause) {
    printw("PAUSE\n");
  } else {
    printw("\n");
  }
  print_main_field(info);
}

void print_main_field(GameInfo_t* info) {
  for (int j = 0; j < COLUMNS * 3 + 2; j++) printw("#");
  printw("\n");
  for (int i = 0; i < ROWS; i++) {
    printw("#");
    for (int j = 0; j < COLUMNS; j++) {
      if (info->field[i][j] == 0)
        printw("   ");
      else if (info->field[i][j] == '*')
        printw("[o]");
      else if (info->field[i][j] == '@')
        printw(" @ ");
      else if (info->field[i][j] == '^')
        printw("[^]");
      else if (info->field[i][j] == 'v')
        printw("[v]");
      else if (info->field[i][j] == '<')
        printw("[<]");
      else if (info->field[i][j] == '>')
        printw("[>]");
    }
    printw("#");
    printw("\n");
  }
  for (int j = 0; j < COLUMNS * 3 + 2; j++) printw("#");
  printw("\n");
}