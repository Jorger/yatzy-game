import { randomNumber } from "../../utils/helpers";
import {
  BONUS_VALUE,
  CATEGORIES,
  EDifficulty,
  EItemType,
  ETypeGame,
  INITIAL_ITEM_SELECTED,
  LABELS_GAME,
  LOWER_SECTION_LABELS,
  MIN_SCORE_BONUS,
  TOTAL_THROWING,
  UPPER_SECTION_LABELS,
  YATZY_SCORES,
} from "../../utils/constants";
import cloneDeep from "lodash.clonedeep";
import type {
  CategoriesType,
  DiceValue,
  Difficulty,
  IBoard,
  IBoardItem,
  IScore,
  IscoreBoard,
  ItemSelectedBoard,
  ItemType,
  Player,
  TotalPlayers,
  TypeGame,
  valueDice,
} from "../../interfaces";

/**
 * Dado el valor de un dado, devuelve la cantidad total de dados con el mismo valor...
 * @param value
 * @param diceValues
 * @returns
 */
const totalDiceSameValue = (value: valueDice, diceValues: DiceValue[]) =>
  diceValues.filter((v) => v.value === value).length;

/**
 * Retorna la sumatoria de todos los dados.
 * @param value
 * @param diceValues
 * @returns
 */
const calculateSumDiceSameValue = (value: valueDice, diceValues: DiceValue[]) =>
  totalDiceSameValue(value, diceValues) * value;

/**
 * Retorna la sumatoria de todos los dados.
 * @param diceValues
 * @returns
 */
const calculateSumAllDice = (diceValues: DiceValue[]) =>
  diceValues.reduce((a, s) => a + s.value, 0);

/**
 * Valida si existen dados con el mismo valor, en este caso con el número de repeticiones
 * exactValue valida si el número de ocurrencias debe ser exacto o puede ser mayor, este
 * valor es útil para validar full house y los valores repetidos...
 * @param repetitions
 * @param diceValues
 * @param exactValue
 * @returns
 */
const calculateDiceSameType = (
  repetitions: number = 2,
  diceValues: DiceValue[],
  exactValue: boolean = false
) => {
  let isRepetition = false;

  for (let i = 1; i <= 6; i++) {
    const total = totalDiceSameValue(i as valueDice, diceValues);

    isRepetition = exactValue ? total === repetitions : total >= repetitions;

    if (isRepetition) {
      break;
    }
  }

  return isRepetition;
};

const calculateIsStraight = (diceValues: DiceValue[], straight: 4 | 5 = 4) => {
  let isStraight = false;

  /**
   * Se clona el valor de los dados
   * Se extrae sólo el valor del dado
   * Se ordenan los valores
   * Se elimina  los valores repetidos...
   */
  const copyDiceValues = [
    ...new Set(
      cloneDeep(diceValues)
        .map((v) => v.value as number)
        .sort((a, b) => a - b)
    ),
  ];

  /**
   * El valor inicial que se pregunta del straight
   */

  let initial = 1;

  do {
    if (initial + (straight - 1) <= 6) {
      let counterStraight = 0;

      // Se itera el número de veces que se desea validar un straight
      // Si el valor del dado es el mismo que el contador se aumenta...
      for (let i = 0; i < straight; i++) {
        // Se valida que exista en el valor en el vector.
        // Si es así se sumará
        // No existe peligro de repetición, ya que sólo exiten valores únicos...
        counterStraight += copyDiceValues.includes(i + initial) ? 1 : 0;
      }

      isStraight = counterStraight === straight;
      initial++;

      if (isStraight) {
        break;
      }
    } else {
      break;
    }
  } while (1);

  return isStraight;
};

/**
 * Calcula el score para cada sección del board...
 * @param section
 * @param turn
 * @returns
 */
const calculateScoreSections = (section: IBoardItem[], turn: TotalPlayers) =>
  section.reduce((a, s) => a + s.score[turn - 1].value, 0);

/**
 * En este caso revisa el array de score
 * el valor isUsed debe ser true en todos los scores (tanto para un juagdor como para dos)
 * @param boardState
 * @param typeGame
 */
const validateGameOver = (boardState: IBoard, typeGame: TypeGame) => {
  // Si el tipo de juego es sólo, en este caso sólo se valida el primer score...
  const scoreSize = typeGame === ETypeGame.SOLO ? 1 : 2;

  const completeBoard = Object.keys(EItemType).map((type) => {
    const section = boardState[type as ItemType];
    // Se obtiene el total de score de cada
    // item (UPPER_SECTION = 6, LOWER_SECTION = 7)
    const size = section.length;
    let total = 0;

    for (let i = 0; i < size; i++) {
      let totalSize = 0;

      // El scoreSize será 1 cuando es sólo y dos para los demás
      for (let c = 0; c < scoreSize; c++) {
        totalSize += section[i].score[c].isUsed ? 1 : 0;
      }

      total += totalSize === scoreSize ? 1 : 0;
    }

    // Si el total global es igual al tamaño de la sección
    // quiere decir que todos tienen un score asociado...
    return total === size;
  });

  // Los valores de las dos secciones deben ser true
  // de esta forma se ha seleccionado todos los valores...
  return completeBoard.every((v) => v);
};

/**
 * Función que devuelve uan lista de indices para selección
 * aleatoria de dados, de forma única...
 * @param total
 * @returns
 */
const getSelectionRandomDice = (total: number = 1) => {
  const selectedDice: number[] = [];

  // Ciclo infinito que intera por la cantida dada en total...
  // el ciclo se rompera una vez el tamaño de selectedDice sea igual que total
  do {
    // Generar el valor del dado...
    // se hace de 0 hasta 4, en este caso para los cinco dados...
    // los valores obtenidos son los indices de cada dado...
    const randomDice = randomNumber(0, 4);

    // Se valida que no exista ya el valor del dado en el vector de selección.
    if (!selectedDice.includes(randomDice)) {
      // Si no existe, se adiciona
      selectedDice.push(randomDice);
    }

    // Si el tamaño del vector es igual al total a generar
    // Se rompe el cliclo...
    if (selectedDice.length === total) {
      break;
    }
  } while (1);

  return selectedDice;
};

/**
 * Función que retorna el mayor o menor valor de una sección
 * Depende del nivel de dificultad solicitado
 * Devuelve el primero en cada caso...
 * @param section
 * @param turn
 * @param difficulty
 * @returns
 */
const getScoreSectionBot = (
  section: IBoardItem[],
  turn: TotalPlayers,
  difficulty: Difficulty
) => {
  const scores = section
    .filter((value) => !value.score[turn - 1].isUsed)
    .map((value) => ({
      index: value.index,
      score: value.score[turn - 1].temporal,
    }))
    .sort((a, b) =>
      difficulty === EDifficulty.HARD ? b.score - a.score : a.score - b.score
    );

  /**
   * Se separan los scores que tengan valor de los que no
   */
  const scoreNoZero = scores.filter((v) => v.score !== 0);
  const scoreZero = scores.filter((v) => v.score === 0);

  /**
   * Se da prioridad al score con valores...
   */
  return scoreNoZero?.[0] || scoreZero?.[0];
};

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

/**
 * Genera los datos iniciales de los dados...
 */
export const getInitialDiceValues = () =>
  new Array(5).fill(null).map(
    (_, index) =>
      ({
        index,
        value: 0,
        selected: false,
      } as DiceValue)
  );

/**
 * Función que genera los valores de los dados...
 * @param diceValues
 * @returns
 */
export const rollDice = (diceValues: DiceValue[]) => {
  const copyDiceValues = cloneDeep(diceValues);
  // copyDiceValues[0].value = 2;
  // copyDiceValues[1].value = 2;
  // copyDiceValues[2].value = 2;
  // copyDiceValues[3].value = 2;
  // copyDiceValues[4].value = 2;

  for (let i = 0; i < copyDiceValues.length; i++) {
    if (!copyDiceValues[i].selected) {
      copyDiceValues[i].value = randomNumber(1, 6) as valueDice;
      // Validar Yatzy
      // copyDiceValues[i].value = 5;
    }
  }

  return copyDiceValues;
};

/**
 * Función que establece cuando un dado ha sido seleccioando...
 * @param diceValues
 * @param diceIndex
 * @returns
 */
export const selectDice = (diceValues: DiceValue[], diceIndex: number = 0) => {
  const copyDiceValues = cloneDeep(diceValues);
  copyDiceValues[diceIndex].selected = !copyDiceValues[diceIndex].selected;

  return copyDiceValues;
};

/**
 * Devuelve la cantidad de dados que se pueden mover.
 * útil para saber si el botón de roll estará habilitado...
 * @param diceValues
 * @returns
 */
export const totalDiceAvailable = (diceValues: DiceValue[]) =>
  diceValues.filter((v) => !v.selected).length;

/**
 * Calcula los valores que serán mostrados en el board...
 * @param boardState
 * @param diceValues
 * @param turn
 * @returns
 */
export const calculateBoardValues = (
  boardState: IBoard,
  diceValues: DiceValue[],
  turn: TotalPlayers = 1
) => {
  const copyBoardState: IBoard = JSON.parse(JSON.stringify(boardState));

  // Obtener la sumatoria de todos los dados...
  const sumAllDice = calculateSumAllDice(diceValues);

  const isThreeKind = calculateDiceSameType(3, diceValues);
  const isFourKind = calculateDiceSameType(4, diceValues);

  /**
   * Valida si es el isFullHouse, en este caso debe hacer tres dados del mismo tipo
   * y dos del mismo tipo, debe ser exacta la cantidad, por eso la bandera de exactValue
   */
  const isFullHouse =
    calculateDiceSameType(3, diceValues, true) &&
    calculateDiceSameType(2, diceValues, true);

  const isSmallStraight = calculateIsStraight(diceValues, 4);
  const isLargeStraight = calculateIsStraight(diceValues, 5);

  /**
   * Para ser un Yatzy todos los dados deben ser del mismo tipo...
   */
  const isYatzy = calculateDiceSameType(5, diceValues);

  // console.log({
  //   sumAllDice,
  //   isThreeKind,
  //   isFourKind,
  //   isFullHouse,
  //   isSmallStraight,
  //   isLargeStraight,
  //   isYatzy,
  // });

  /**
   * Se establece el puntaje para sección baja de la tabla,
   * de acuerdo a los valores obtenidos en las funciones de arriba...
   */
  const lowerSectionValues: { [key in CategoriesType]: number } = {
    THREE_KIND: isThreeKind ? sumAllDice : 0,
    FOUR_KIND: isFourKind ? sumAllDice : 0,
    FULL_HOUSE: isFullHouse ? YATZY_SCORES.FULLHOUSE : 0,
    SMALL_STRAIGHT: isSmallStraight ? YATZY_SCORES.SMALL_STRAIGHT : 0,
    LARGE_STRAIGHT: isLargeStraight ? YATZY_SCORES.LARGE_STRAIGHT : 0,
    YATZY: isYatzy ? YATZY_SCORES.YATZY : 0,
    CHANCE: sumAllDice,
  };

  // console.log(lowerSectionValues);

  /**
   * Establecer los valores para para la seccción alta, en este caso
   * son las sumatorias de los dados...
   */
  for (let i = 0; i < copyBoardState.UPPER_SECTION.length; i++) {
    // Si no se ha usado la casilla, se establece el valor temporal para la misma
    if (!copyBoardState.UPPER_SECTION[i].score[turn - 1]?.isUsed) {
      const { value } = copyBoardState.UPPER_SECTION[i];
      const totalValue = calculateSumDiceSameValue(
        value as valueDice,
        diceValues
      );

      copyBoardState.UPPER_SECTION[i].score[turn - 1].temporal = totalValue;
    }
  }

  for (let i = 0; i < copyBoardState.LOWER_SECTION.length; i++) {
    const { value } = copyBoardState.LOWER_SECTION[i];

    // Si no está usado se podrá establecer su valor temporal
    if (!copyBoardState.LOWER_SECTION[i].score[turn - 1]?.isUsed) {
      copyBoardState.LOWER_SECTION[i].score[turn - 1].temporal =
        lowerSectionValues[value as CategoriesType];
    }
  }

  return { isYatzy, copyBoardState };
};

/**
 * Selecciona un ítem del board
 * @param boardState
 * @param itemSelected
 * @param item
 * @param turn
 * @param isYatzy
 * @returns
 */
export const selectItemBoard = (
  boardState: IBoard,
  itemSelected: ItemSelectedBoard,
  item: IBoardItem,
  turn: TotalPlayers,
  isYatzy: boolean = false
) => {
  const copyBoardState: IBoard = cloneDeep(boardState);
  const newItemSelected: ItemSelectedBoard = cloneDeep(INITIAL_ITEM_SELECTED);
  const { isUsed } = copyBoardState[item.type][item.index].score[turn - 1];
  // Establece si cambia o no el estado en el board..
  let changeState = false;

  if (!isUsed) {
    // Si ya se había seleccionado un ítem, lo deseleccionará
    if (itemSelected.index >= 0) {
      copyBoardState[itemSelected.type][itemSelected.index].score[
        turn - 1
      ].isSelected = false;

      // Establece por defecto que el no hay bono de Yatzy...
      copyBoardState[itemSelected.type][itemSelected.index].score[
        turn - 1
      ].isBonusYatzy = false;
    }

    // Valida si el ítem ya estaba seleccionado...
    // es decir si seleccionó el mismo que había seleccionado antes...
    const alreadySelected =
      itemSelected.index === item.index && itemSelected.type === item.type;

    // Si no es el caso, se puede mutar el valor...
    if (!alreadySelected) {
      newItemSelected.index = item.index;
      newItemSelected.type = item.type;
      copyBoardState[item.type][item.index].score[turn - 1].isSelected = true;

      // Para indicar que hay un bono de yanzy disponible...
      // Pero antes se debe validar que el espacio del yanzy ya haya sido ocupado...
      const isYanzySelected =
        copyBoardState.LOWER_SECTION.filter(
          (v) => v.value === "YATZY" && v.score[turn - 1].isUsed
        ).length !== 0;

      // Si se ha ontendo un yatzy y ya se había usado el espacio dle mismo.
      // se indica que se tiene un bono de yanzy, en la casilla seleccionada...
      copyBoardState[item.type][item.index].score[turn - 1].isBonusYatzy =
        isYanzySelected && isYatzy;
    }

    changeState = true;
  }

  return { changeState, copyBoardState, newItemSelected };
};

/**
 * Deselecciona un ítem del board,
 * sólo si antes estaba seleccionado...
 * @param boardState
 * @param itemSelected
 * @param turn
 * @returns
 */
export const deselectBoardItemBoard = (
  boardState: IBoard,
  itemSelected: ItemSelectedBoard,
  turn: TotalPlayers
) => {
  const copyBoardState: IBoard = cloneDeep(boardState);

  copyBoardState[itemSelected.type][itemSelected.index].score[
    turn - 1
  ].isSelected = false;

  // Por si se tenía un bono de Yatzy activado...
  copyBoardState[itemSelected.type][itemSelected.index].score[
    turn - 1
  ].isBonusYatzy = false;

  return copyBoardState;
};

/**
 * Una vez presionado el botón de Play, se calcula el score...
 * @param boardState
 * @param itemSelected
 * @param players
 * @param turn
 * @param typeGame
 * @param isYatzy
 * @returns
 */
export const calculateScore = (
  boardState: IBoard,
  itemSelected: ItemSelectedBoard,
  players: Player[],
  turn: TotalPlayers,
  typeGame: TypeGame,
  isYatzy: boolean
) => {
  const copyBoardState: IBoard = cloneDeep(boardState);
  const copyPlayers: Player[] = cloneDeep(players);
  const { type, index } = itemSelected;
  const { isBonusEarned } = copyPlayers[turn - 1];
  const { temporal } = copyBoardState[type][index].score[turn - 1];

  // Se valida si es un bono para el yanzy, sólo ocurre si:
  // 1. Si se ha obtenido un Yanzy
  // 2. Si la casilla que se ha seleccionado no es un YATZY
  // 3. Y además que la casilla de YATZY esté ya ocuopada...
  let isBonusYatzy = false;
  if (isYatzy && copyBoardState[type][index].value !== "YATZY") {
    const indexYanzy = copyBoardState.LOWER_SECTION.findIndex(
      (v) => v.value === "YATZY"
    );

    isBonusYatzy =
      copyBoardState.LOWER_SECTION[indexYanzy].score[turn - 1].isUsed;
  }

  // Se toma el valor temporal de la casilla
  // si había un bono de tipo yatzy se lo agrega...
  const finalValue = temporal + (isBonusYatzy ? YATZY_SCORES.YATZY : 0);
  copyBoardState[type][index].score[turn - 1].isSelected = false;
  copyBoardState[type][index].score[turn - 1].isUsed = true;
  copyBoardState[type][index].score[turn - 1].isBonusYatzy = false;
  copyBoardState[type][index].score[turn - 1].value = finalValue;

  /**
   * Se calcula todo el valor de la sección de nuevo
   * Si ya había ontenido el bono, se añade el valor al existente
   */
  let scoreUpperSection =
    calculateScoreSections(copyBoardState.UPPER_SECTION, turn) +
    (isBonusEarned ? BONUS_VALUE : 0);

  /**
   * Se valida si el puntaje obtenido es mayor e igual que el valor mínimo para el bono
   * Igualmente se valida que no se haya dado el bono antes...
   */
  if (!isBonusEarned && scoreUpperSection >= MIN_SCORE_BONUS) {
    copyPlayers[turn - 1].isBonusEarned = true;
    scoreUpperSection += BONUS_VALUE;
  }

  const scoreLowerSection = calculateScoreSections(
    copyBoardState.LOWER_SECTION,
    turn
  );

  copyPlayers[turn - 1].score = scoreUpperSection + scoreLowerSection;

  copyPlayers[turn - 1].scoreBoard = {
    UPPER_SECTION: scoreUpperSection,
    LOWER_SECTION: scoreLowerSection,
  };

  const isGameOver = validateGameOver(copyBoardState, typeGame);

  return {
    copyBoardState,
    copyPlayers,
    isGameOver,
  };
};

/**
 * Función que establece los valores que seleccionará el bot de los dados
 * Es aleatorio, sólo se hará cuando ya se haya realizado un lazamiento
 * De lo contrario no se selecciona ninguno...
 * @param diceValues
 * @param throwing
 * @returns
 */
export const diceRandomSelectionBot = (
  diceValues: DiceValue[],
  throwing: number
) => {
  const copyDiceValues = cloneDeep(diceValues);

  // Determinar la cantidad de dados que se van a bloquear/seleccionar...
  // Si es cero, no se bloquea ninguno...
  // Se deja máximo 4, para que no bloquee todos los dados,
  // al menos, uno quedará activo...
  const totalSelectedDice = randomNumber(0, 4);

  /**x
   * Sólo ingresa si el número de lanzamientos es menor al permitido (3)
   * Además que el valor aletorio haya indicado el número de dados a bloquear...
   */
  if (throwing < TOTAL_THROWING && totalSelectedDice > 0) {
    const diceIndices = getSelectionRandomDice(totalSelectedDice);

    //Se itera los dados y se habilitan los que estén en el vector de indices...
    // los demás se deseleccionan...
    for (let i = 0; i < copyDiceValues.length; i++) {
      copyDiceValues[i].selected = diceIndices.includes(i);
    }
  }

  return copyDiceValues;
};

/**
 * Fnción que determina:
 * Si habá un nuevo lanzamiento de dado o
 * indicará cual es el ítem del board que seleccionará...
 * @param boardState
 * @param throwing
 * @param difficulty
 * @param isYatzy
 * @param turn
 * @returns
 */
export const validateNextBotRoll = (
  boardState: IBoard,
  throwing: number,
  difficulty: Difficulty,
  isYatzy: boolean,
  turn: TotalPlayers
) => {
  /**
   * Se determina la dificultad final del lanzamiento para el bot
   * En este caso si la dificultad es medium, ésta se determina de forma aleatoria
   */
  const finalDifficulty: Difficulty =
    difficulty === EDifficulty.MEDIUM
      ? randomNumber(0, 1) === 1
        ? EDifficulty.HARD
        : EDifficulty.EASY
      : difficulty;

  /**
   * Se obtien el valor potencial del score para la sección alta
   * En este caso se devuleve sólo un valor, el cual dependiendo de la
   * dificultad podrá ser el mayor de todos o el menor
   */
  const scoreUpperSection = getScoreSectionBot(
    boardState.UPPER_SECTION,
    turn,
    finalDifficulty
  );

  /**
   * Mismo proceso para la sección baja..
   */
  const scoreLowerSection = getScoreSectionBot(
    boardState.LOWER_SECTION,
    turn,
    finalDifficulty
  );

  /**
   * Determina si los valores resultantes del board existen,
   * si es así determina si los valores no son cero
   * Si alguno de los dos no es cero, se indica que no es necesario
   * otro lanzamiento...
   */
  let isValueOnBoard = false;
  if (scoreUpperSection || scoreLowerSection) {
    if (scoreUpperSection) {
      isValueOnBoard = scoreUpperSection?.score !== 0;
    }

    if (!isValueOnBoard && scoreLowerSection) {
      isValueOnBoard = scoreLowerSection?.score !== 0;
    }
  }

  /**
   * Se vuleve a lanzar un dado si:
   * 1. Sí aún se tienen lanzamientos disponibles.
   * 2. Si se determina que entre los valores devueltos a un valor diferente a cero.
   * 3. Si no hay un Yatzy.
   */
  const rollAgain = throwing > 0 && !isValueOnBoard && !isYatzy;

  // Es el que indica el elemento que se selecciona
  // Es let por que su valor puede que cambie...
  let itemSelected: ItemSelectedBoard = cloneDeep(INITIAL_ITEM_SELECTED);

  // Si se decide que no se hace otro lanzamiento se va a elegir la casilla
  if (!rollAgain) {
    // Si se ha obtenido un Yanzy, se buscará la casilla de Yanzy...
    if (isYatzy) {
      // Se obtiene la casilla del yanzy...
      const indexYanzy = boardState.LOWER_SECTION.findIndex(
        (v) => v.value === "YATZY"
      );

      // Se valida que el Yatzy no haya sido seleccionado ya...
      if (!boardState.LOWER_SECTION[indexYanzy].score[turn - 1].isUsed) {
        // Como no se ha seleccionado, se toma la casilla
        // y por lo tanto se haría el lanzamiento...
        itemSelected.index = indexYanzy;
        itemSelected.type = EItemType.LOWER_SECTION;
      }
    }

    // Si el valor es menor que 0 para itemSelected,
    // quiere decir que no se ha seleccionado nada
    // Podría estar seleccionado si antes fue un Yanzy...
    if (itemSelected.index < 0) {
      /**
       * Se valida que existan score en ambas partes del board
       */
      if (scoreUpperSection && scoreLowerSection) {
        /**
         * Se obtiene el puntaje cuando la dificultad es alta
         * En este caso se toma el mayor valor de las dos secciones...
         */
        const scoreDifficultyHard: ItemSelectedBoard =
          scoreUpperSection.score > scoreLowerSection.score
            ? {
                index: scoreUpperSection.index,
                type: EItemType.UPPER_SECTION,
              }
            : {
                index: scoreLowerSection.index,
                type: EItemType.LOWER_SECTION,
              };

        /**
         * Se obtiene el score cuando la dificultad es baja
         * En este caso se toma el valor menor...
         */
        const scoreDifficultyEasy: ItemSelectedBoard =
          scoreUpperSection.score < scoreLowerSection.score
            ? {
                index: scoreUpperSection.index,
                type: EItemType.UPPER_SECTION,
              }
            : {
                index: scoreLowerSection.index,
                type: EItemType.LOWER_SECTION,
              };

        // Se guardan los scores finales...
        const scoresObtained: {
          [key in Exclude<Difficulty, "MEDIUM">]: ItemSelectedBoard;
        } = {
          HARD: scoreDifficultyHard,
          EASY: scoreDifficultyEasy,
        };

        // Dependiendo del nivel, se establece cual es el ítem seleccionado...
        itemSelected = scoresObtained[finalDifficulty];
      } else {
        if (scoreUpperSection) {
          itemSelected.index = scoreUpperSection.index;
          itemSelected.type = EItemType.UPPER_SECTION;
        }

        if (scoreLowerSection) {
          itemSelected.index = scoreLowerSection.index;
          itemSelected.type = EItemType.LOWER_SECTION;
        }
      }
    }
  }

  return { rollAgain, itemSelected };
};
