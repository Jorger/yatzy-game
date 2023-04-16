import type { CategoriesType, ItemSelectedBoard } from "../interfaces";

export const BASE_HEIGHT = 732;
export const BASE_WIDTH = 412;
export const BONUS_VALUE = 35;
export const MIN_SCORE_BONUS = 63;
export const INTERVAL_TIME = 1000;
export const INTERVAL_VALUE_COUNTDOWN = 60;
export const TOTAL_THROWING = 3;
export const ROOM_SIZE_RANGE_BASE = 5;
export const INITIAL_ITEM_SELECTED: ItemSelectedBoard = {
  index: -1,
  type: "LOWER_SECTION",
};
export const YATZY_SCORES = {
  FULLHOUSE: 25,
  LARGE_STRAIGHT: 40,
  SMALL_STRAIGHT: 30,
  YATZY: 50,
};

export enum EDiceTheme {
  "WHITE" = "WHITE",
  "RED" = "RED",
}

export enum EDifficulty {
  "EASY" = "EASY",
  "MEDIUM" = "MEDIUM",
  "HARD" = "HARD",
}

export enum ETypeGame {
  "SOLO" = "SOLO",
  "ONLINE" = "ONLINE",
  "FRIEND" = "FRIEND",
  "BOT" = "BOT",
}

export const enum EDiceState {
  "HIDE" = "HIDE",
  "SPIN" = "SPIN",
  "STOPPED" = "STOPPED",
}

export const enum ETypeButtonGame {
  "ROLL" = "ROLL",
  "PLAY" = "PLAY",
}

export enum EItemType {
  "UPPER_SECTION" = "UPPER_SECTION",
  "LOWER_SECTION" = "LOWER_SECTION",
}

export const CATEGORIES: CategoriesType[] = [
  "THREE_KIND",
  "FOUR_KIND",
  "FULL_HOUSE",
  "SMALL_STRAIGHT",
  "LARGE_STRAIGHT",
  "YATZY",
  "CHANCE",
];

export const UPPER_SECTION_LABELS = [
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
];

export const LOWER_SECTION_LABELS = [
  "Three of a kind",
  "Four of a kind",
  "Full house",
  "Small straight",
  "Large straight",
  "Yatzy",
  "Chance",
];

export const DEFUAL_LABELS_HEADER = ["Minor", "Mayor"];
export const LABELS_GAME = {
  BOT: "Bot",
  PLAYER1: "Player 1",
  PLAYER2: "Player 2",
  THEM: "Them",
  YOU: "You",
  BONUS: "Section Bonus",
  ROLL: "Roll",
  PLAY: "Play",
  AMAZING_SCORE: "Amazing Score!",
  TIE: "It's a tie!",
  WON: "Congratulations! You Won!",
  LOSE: "Too Bad! You lost this time",
};

document.documentElement.style.setProperty("--base-height", `${BASE_HEIGHT}px`);
document.documentElement.style.setProperty("--base-width", `${BASE_WIDTH}px`);
