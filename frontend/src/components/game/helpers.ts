import type {
  IBoard,
  IBoardItem,
  IScore,
  IscoreBoard,
  Player,
  TotalPlayers,
  TypeGame,
  valueDice,
} from "../../interfaces";
import {
  CATEGORIES,
  EItemType,
  ETypeGame,
  LABELS_GAME,
  LOWER_SECTION_LABELS,
  UPPER_SECTION_LABELS,
} from "../../utils/constants";

/**
 * Crea el estado inicial del board
 * @returns
 */
export const getInitalBoardState = () => {
  // La base del score...
  const initialScore: IScore = {
    value: 0,
    temporal: 0,
    isSelected: false,
    isUsed: false,
    isBonusYatzy: false,
  };

  // Por defecto son 6 valores, correspondientes a cada dado...
  const UPPER_SECTION: IBoardItem[] = new Array(6)
    .fill(null)
    .map((_, index) => {
      const score: IscoreBoard = [initialScore, initialScore];

      return {
        index,
        label: UPPER_SECTION_LABELS[index],
        score,
        type: EItemType.UPPER_SECTION,
        value: (index + 1) as valueDice,
      };
    });

  // Son 7, correspondiente a la catagoria existente...
  const LOWER_SECTION: IBoardItem[] = CATEGORIES.map((category, index) => {
    const score: IscoreBoard = [initialScore, initialScore];

    return {
      index,
      label: LOWER_SECTION_LABELS[index],
      score,
      type: EItemType.LOWER_SECTION,
      value: category,
    };
  });

  const INITIAL_BOARD_GAME: IBoard = { UPPER_SECTION, LOWER_SECTION };

  return INITIAL_BOARD_GAME;
};

/**
 * Devuleve la información inicial de los players...
 * Si existe un player autenticado, pasará los datos de ese usuario
 * @param typeGame
 * @param authUser
 * @param opponent
 * @returns
 */
export const getInitialPlayers = (
  typeGame: TypeGame = ETypeGame.SOLO,
  authUser: Partial<Player> = {},
  opponent: Partial<Player> = {}
) => {
  // Se determina la cantidad de jugadores, dependiendo del tipo de juego...
  const totalPlayers: TotalPlayers = typeGame === ETypeGame.SOLO ? 1 : 2;

  // Se establece la data base para un jugador...
  const basePlayer: Player = {
    id: "",
    name: "",
    score: 0,
    scoreBoard: { UPPER_SECTION: 0, LOWER_SECTION: 0 },
    isBonusEarned: false,
  };

  // Se genera el array de información para los jugadores...
  // y se especifica la data faltante, como el nombre y el id
  const players: Player[] = new Array(totalPlayers)
    .fill(null)
    .map((_, index) => ({
      ...basePlayer,
      id: `player${index + 1}`,
      name: `Player ${index + 1}`,
    }));

  // Se establecen labels personalizados para los nombres...
  if (typeGame === ETypeGame.SOLO || typeGame === ETypeGame.BOT) {
    players[0].name = LABELS_GAME.YOU;
  }

  // En este caso para el bot...
  if (typeGame === ETypeGame.BOT) {
    players[1].name = LABELS_GAME.BOT;
  }

  // Si el usuario está autenticado, se establece sus datos...
  // aplicable para el jugador 1
  players[0] = { ...players[0], ...authUser };

  // Para completar los datos del oponente,
  // sólo cuando es la versión online
  if (typeGame === ETypeGame.ONLINE && opponent) {
    players[1] = { ...players[1], ...opponent };
  }

  return players;
};
