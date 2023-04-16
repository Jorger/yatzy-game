import {
  EDiceTheme,
  EDiceState,
  EDifficulty,
  EItemType,
  ETypeButtonGame,
  ETypeGame,
} from "../utils/constants";

export type ItemType = keyof typeof EItemType;

export type valueDice = 1 | 2 | 3 | 4 | 5 | 6;

export type TotalPlayers = 1 | 2;

export type TypeGame = keyof typeof ETypeGame;

export type TypeButtonGame = keyof typeof ETypeButtonGame;

export type CategoriesType =
  | "THREE_KIND"
  | "FOUR_KIND"
  | "FULL_HOUSE"
  | "SMALL_STRAIGHT"
  | "LARGE_STRAIGHT"
  | "YATZY"
  | "CHANCE";

export interface IScore {
  value: number;
  temporal: number;
  isSelected: boolean;
  isUsed: boolean;
  isBonusYatzy: boolean;
}

export type IscoreBoard = [IScore, IScore];
export interface IBoardItem {
  index: number;
  type: ItemType;
  /** Type of the item on the board */
  value: valueDice | CategoriesType;
  label: string;
  score: IscoreBoard;
}

/**
 * Mapped object type
 */
export type IBoard = { [key in ItemType]: IBoardItem[] };

export interface DiceValue {
  index: number;
  value: valueDice | 0;
  selected: boolean;
}

export type DiceState = keyof typeof EDiceState;

export type DiceTheme = keyof typeof EDiceTheme;

export type Difficulty = keyof typeof EDifficulty;

export type ScoreBoard = { [key in ItemType]: number };
export interface Player {
  id?: string;
  name: string;
  photo?: string;
  score: number;
  scoreBoard: ScoreBoard;
  isBonusEarned: boolean;
  socketID?: string;
}

export interface HeaderCountdown {
  stop: boolean;
  onEndCountdown: (player: TotalPlayers) => void;
}

export interface ItemSelectedBoard {
  index: number;
  type: ItemType;
}

export interface IAuthOptions {
  socialName: string;
  routerURL: string;
}

export interface IAuth {
  isAuth: boolean;
  authOptions: IAuthOptions[];
  user?: Partial<Player>;
  roomRange: number;
}

// Para los eventos online
export interface OnlineRollDice {
  room: string;
  diceValues: DiceValue[];
  type: TypeButtonGame;
}

export type OnlinePlay = Omit<OnlineRollDice, "diceValues"> & {
  itemSelected: ItemSelectedBoard;
  isGameOver?: boolean;
};

export type TypeRoom = "ONLINE" | "FRIEND";
export interface IOnlineOptions {
  type: TypeRoom;
  label: string;
}

export interface IServiceWorker {
  serviceWorkerInitialized?: boolean;
  serviceWorkerUpdated?: boolean;
  serviceWorkerRegistration?: ServiceWorkerRegistration;
}
