import {
  Board,
  Buttons,
  Dices,
  GameMessages,
  GameWrapper,
  Header,
  ScoreGame,
} from "./components";
import {
  calculateBoardValues,
  calculateScore,
  deselectBoardItemBoard,
  diceRandomSelectionBot,
  getInitalBoardState,
  getInitialDiceValues,
  getInitialPlayers,
  rollDice,
  selectDice,
  selectItemBoard,
  totalDiceAvailable,
  validateNextBotRoll,
} from "./helpers";
import { delay } from "../../utils/helpers";
import {
  EDiceState,
  EDiceTheme,
  EDifficulty,
  ETypeButtonGame,
  ETypeGame,
  INITIAL_ITEM_SELECTED,
  TOTAL_THROWING,
} from "../../utils/constants";
import { playSounds } from "../../utils/sounds";
import React, { useCallback, useEffect, useState } from "react";
import type {
  DiceState,
  DiceTheme,
  Difficulty,
  IBoardItem,
  ItemSelectedBoard,
  TotalPlayers,
  TypeButtonGame,
  TypeGame,
} from "../../interfaces";

interface GameProps {
  typeGame: TypeGame;
  initialTurn: TotalPlayers;
  difficulty?: Difficulty;
}

const Game = ({
  difficulty = EDifficulty.EASY,
  typeGame = ETypeGame.BOT,
  initialTurn = 2,
}: GameProps) => {
  // Guarda el estado del board
  const [boardState, setBoardState] = useState(getInitalBoardState);
  // Estado de los jugadores del juego (máximo serán dos)...
  const [players, setPlayers] = useState(() => getInitialPlayers(typeGame));
  // Para el turno...
  const [turn, setTurn] = useState<TotalPlayers>(
    typeGame !== ETypeGame.SOLO ? initialTurn : 1
  );
  // Estado de los dados..
  const [diceValues, setDiceValues] = useState(() => getInitialDiceValues());
  // Estado de animación de los dados...
  const [dieState, setDieState] = useState<DiceState>(EDiceState.HIDE);
  // Guardará el estado del total de lanzamientos...
  const [throwing, setThrowing] = useState(TOTAL_THROWING);
  // Para saber si se ha logrado un Yatzy...
  const [isYatzy, setIsYatzy] = useState(false);
  // Para guardar el ítem seleccionado en el board...
  const [itemSelected, setItemSelected] = useState<ItemSelectedBoard>(
    INITIAL_ITEM_SELECTED
  );
  // Estado para saber si el juego ha terminado...
  const [gamerOver, setGamerOver] = useState(false);
  // Para controlar los mensajes del juego...
  // En este caso para mostrar si es un Yatzy
  // o para mostrar el turno cuando hay dos jugadores de tipo friends offline
  const [message, setMessage] = useState({
    isYatzy: false,
    value: typeGame === ETypeGame.FRIEND ? `Player ${turn}` : "",
    counter: typeGame === ETypeGame.FRIEND ? 1 : 0,
  });

  /**
   * Evento que se ejecuta una vez ha terminado de girar los dados...
   */
  const handleDoneDices = () => {
    const { copyBoardState, isYatzy: newIsYatzy } = calculateBoardValues(
      boardState,
      diceValues,
      turn
    );

    setBoardState(copyBoardState);
    setIsYatzy(newIsYatzy);
    setDieState(EDiceState.STOPPED);
    setItemSelected(INITIAL_ITEM_SELECTED);

    // Si es Yatzy, se establece que muestre el mensaje...
    if (newIsYatzy) {
      setMessage((prev) => ({
        isYatzy: true,
        value: "Yatzy",
        counter: prev.counter + 1,
      }));

      playSounds("yatzy");
    }
  };

  /**
   * Función que establece la selección de un dado...
   * @param index
   */
  const handleSelectDice = (index: number) => {
    playSounds("click");
    setDiceValues(selectDice(diceValues, index));
  };

  /**
   * Evento para los botones de girar los dados
   * y seleccionar el ítem del board
   * @param type
   */
  const handleClickButtons = useCallback(
    (type: TypeButtonGame) => {
      if (type === ETypeButtonGame.ROLL) {
        // Dejar el board sin opciones seleccionadas...
        // Sólo si había una seleccionada...
        if (itemSelected.index >= 0) {
          setBoardState((board) =>
            deselectBoardItemBoard(board, itemSelected, turn)
          );
        }

        setDiceValues((values) => {
          const newDiceValues = rollDice(values);
          return newDiceValues;
        });
        setDieState(EDiceState.SPIN);
        setThrowing((value) => value - 1);
      }

      if (type === ETypeButtonGame.PLAY) {
        const { copyBoardState, copyPlayers, isGameOver } = calculateScore(
          boardState,
          itemSelected,
          players,
          turn,
          typeGame,
          isYatzy
        );

        setBoardState(copyBoardState);
        setPlayers(copyPlayers);

        // Reiniciar el estado...
        setThrowing(TOTAL_THROWING);
        setDieState(EDiceState.HIDE);
        setDiceValues(getInitialDiceValues());
        setItemSelected(INITIAL_ITEM_SELECTED);
        setGamerOver(isGameOver);

        // Sonido cuando el usuario hace click en el botón Play
        playSounds("click");

        // Sonido cuando el juego ha acabado...
        if (isGameOver) {
          playSounds("yatzy");
        }

        if (!isGameOver && typeGame !== ETypeGame.SOLO) {
          const newTurn: TotalPlayers = turn === 1 ? 2 : 1;
          setTurn(newTurn);

          // Al cambiar de turno y es el juego es contra un amigo
          // en el mismo dispositivo, se muestra el mensaje...
          if (typeGame === ETypeGame.FRIEND) {
            setMessage((prev) => ({
              isYatzy: false,
              value: `Player ${newTurn}`,
              counter: prev.counter + 1,
            }));
          }
        }
      }
    },
    [boardState, isYatzy, itemSelected, players, turn, typeGame]
  );

  /**
   * Evento para la selección de un elemento en el board...
   * @param item
   * @param player
   */
  const handleClickBoard = (item: IBoardItem, player: TotalPlayers) => {
    const { changeState, copyBoardState, newItemSelected } = selectItemBoard(
      boardState,
      itemSelected,
      item,
      player,
      isYatzy
    );

    if (changeState) {
      playSounds("click");
      setBoardState(copyBoardState);
      setItemSelected(newItemSelected);
    }
  };

  /**
   * Efecto que se ejecuta cuando giran los dados.
   * Sólo para el bot
   */
  useEffect(() => {
    const isBotTurn = typeGame === ETypeGame.BOT && turn === 2;

    const runAsyncRollDice = async () => {
      // Realiza la acción 1 segundo depsupés
      // Para que no se ejecute de inmediato al cargar el componente...
      await delay(1000);
      /**
       * Se simula el lanzamiento del dado
       * la función diceRandomSelectionBot, simula selecciones del dado,
       * no lo hará para el primer lanzamiento
       */
      setDiceValues((value) =>
        rollDice(diceRandomSelectionBot(value, throwing))
      );
      setDieState(EDiceState.SPIN);
      setThrowing((value) => value - 1);
    };

    // El turno inicial para el bot...
    // Además se valida que el juego no haya terminado aún...
    if (!gamerOver && isBotTurn && dieState === EDiceState.HIDE) {
      runAsyncRollDice();
    }

    if (isBotTurn && dieState === EDiceState.STOPPED) {
      const { rollAgain = false, itemSelected: newItemSelected } =
        validateNextBotRoll(boardState, throwing, difficulty, isYatzy, turn);

      if (rollAgain) {
        runAsyncRollDice();
      } else {
        setItemSelected(newItemSelected);
      }
    }

    if (!gamerOver && dieState === EDiceState.SPIN) {
      playSounds("dice");
    }
  }, [
    boardState,
    dieState,
    difficulty,
    gamerOver,
    isYatzy,
    throwing,
    turn,
    typeGame,
  ]);

  /**
   * Efecto que se ejcuta cuando se ha seleccionado un ítem del board
   * ES aplicable para el bot y para el oponente en la jugabilidad online...
   */
  useEffect(() => {
    const isBotTurn = typeGame === ETypeGame.BOT && turn === 2;

    const runAsyncPlayBot = async () => {
      await delay(2000);
      handleClickButtons(ETypeButtonGame.PLAY);
    };

    if (isBotTurn && itemSelected.index >= 0) {
      runAsyncPlayBot();
    }
  }, [handleClickButtons, itemSelected, turn, typeGame]);

  /**
   * Función que retorna cuando el contador de tiempo ha finalizado
   * Sólo se ejecutará el tipo Online...
   * @param player
   */
  const onEndCountdown = (player: TotalPlayers) => {
    console.log({ player });
  };

  /**
   * Sólo se agrega el cronometro cuando es online...
   */
  const countdown =
    typeGame === ETypeGame.ONLINE ? { stop: false, onEndCountdown } : undefined;

  // Para saber si es el caso donde la interfaz de ambos lados
  // se habilita para cuando hay dos jugadores, en este caso, sólo
  // aplica cuando se está jugando con un amigo...
  const turnsEnabledTwoPlayers = turn === 1 || typeGame === ETypeGame.FRIEND;

  /**
   * Se bloquea el contenido para el jugador uno
   * útil cuando se juega contra un BOT o ONLINE
   * Se aplica siempre y cuando no sea game over
   * y además que sea el turno dos
   */
  const blockContent =
    !gamerOver &&
    (typeGame === ETypeGame.BOT || typeGame === ETypeGame.ONLINE) &&
    turn === 2;

  /**
   * Bloquea el botón que lanza los dados
   */
  const disabledRoll =
    blockContent ||
    gamerOver ||
    dieState === EDiceState.SPIN ||
    throwing <= 0 ||
    totalDiceAvailable(diceValues) === 0;

  /**
   * Bloquear el botón que acepta la selección de un ítem
   */
  const disabledPlay =
    blockContent || dieState === EDiceState.SPIN || itemSelected.index < 0;

  /**
   * Sólo muestra el botón de play si:
   * No se ha acabdo el juego
   * Si los dados están visibles
   * Además que sea el turno 1 ó que sea de tipo jugar con amigo...
   */
  const showPlay =
    !gamerOver && dieState !== EDiceState.HIDE && turnsEnabledTwoPlayers;

  /**
   * Sólo será blanco para dos juagdores si s esta jugando con un amigo
   * De lo contrario, cuando tiene el turno el jugador dos, de los otros tipos
   * el color cambiará a rojo...
   */
  const diceTheme: DiceTheme =
    EDiceTheme[turnsEnabledTwoPlayers ? "WHITE" : "RED"];

  // Para validar si se muestra los valores de la tabla...
  // Cuando es el turno del jugador dos, salvo que se este jugando con un amigo
  // no se mostrará estos valores...
  const thrownDice = turnsEnabledTwoPlayers && dieState === EDiceState.STOPPED;

  return (
    <GameWrapper blockContent={blockContent}>
      {gamerOver && <ScoreGame players={players} />}
      <GameMessages {...message} />
      <Header countdown={countdown} players={players} turn={turn} />
      <Board
        items={boardState}
        players={players}
        thrownDice={thrownDice}
        turn={turn}
        typeGame={typeGame}
        handleClick={handleClickBoard}
      />
      <Dices
        dieState={dieState}
        values={diceValues}
        diceTheme={diceTheme}
        handleDoneDices={handleDoneDices}
        handleSelectDice={handleSelectDice}
      />
      <Buttons
        disabledPlay={disabledPlay}
        disabledRoll={disabledRoll}
        showPlay={showPlay}
        throwing={throwing}
        handleClick={handleClickButtons}
      />
    </GameWrapper>
  );
};

export default React.memo(Game);
