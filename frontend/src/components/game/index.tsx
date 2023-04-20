import { Board, Buttons, Dices, GameWrapper, Header } from "./components";
import {
  getInitalBoardState,
  getInitialDiceValues,
  getInitialPlayers,
  rollDice,
  selectDice,
  totalDiceAvailable,
} from "./helpers";
import {
  EDiceState,
  EDiceTheme,
  ETypeButtonGame,
  ETypeGame,
  TOTAL_THROWING,
} from "../../utils/constants";
import React, { useState } from "react";
import type {
  DiceState,
  DiceTheme,
  TotalPlayers,
  TypeButtonGame,
  TypeGame,
} from "../../interfaces";

interface GameProps {
  typeGame?: TypeGame;
  initialTurn?: TotalPlayers;
}

const Game = ({ typeGame = ETypeGame.FRIEND, initialTurn = 1 }: GameProps) => {
  // Guarda el estado del board
  // setBoardState
  const [boardState] = useState(getInitalBoardState);
  // Estado de los jugadores del juego (máximo serán dos)...
  // setPlayers
  const [players] = useState(() => getInitialPlayers(typeGame));
  // Para el turno, setTurn
  const [turn] = useState<TotalPlayers>(initialTurn);
  // Estado de los dados..
  const [diceValues, setDiceValues] = useState(() => getInitialDiceValues());
  // Estado de animación de los dados...
  const [dieState, setDieState] = useState<DiceState>(EDiceState.HIDE);
  // Guardará el estado del total de lanzamientos...
  const [throwing, setThrowing] = useState(TOTAL_THROWING);

  /**
   * Evento que se ejecuta una vez ha terminado de girar los dados...
   */
  const handleDoneDices = () => {
    console.log("Termina");
    setDieState(EDiceState.STOPPED);
  };

  /**
   * Función que establece la selección de un dado...
   * @param index
   */
  const handleSelectDice = (index: number) => {
    setDiceValues(selectDice(diceValues, index));
  };

  /**
   * Evento para los botones de girar los dados
   * y seleccionar el ítem del board
   * @param type
   */
  const handleClickButtons = (type: TypeButtonGame) => {
    if (type === ETypeButtonGame.ROLL) {
      setDiceValues(() => rollDice(diceValues));
      setDieState(EDiceState.SPIN);
      setThrowing((value) => value - 1);
    }

    if (type === ETypeButtonGame.PLAY) {
      console.log("PLAY");
    }
  };

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
    (typeGame === ETypeGame.BOT || typeGame === ETypeGame.ONLINE) && turn === 2;

  /**
   * Bloquea el botón que lanza los dados
   */
  const disabledRoll =
    blockContent ||
    dieState === EDiceState.SPIN ||
    throwing <= 0 ||
    totalDiceAvailable(diceValues) === 0;

  /**
   * Bloquear el botón que acepta la selección de un ítem
   */
  const disabledPlay = blockContent || dieState === EDiceState.SPIN;

  /**
   * Sólo muestra el botón de play si:
   * No se ha acabdo el juego
   * Si los dados están visibles
   * Además que sea el turno 1 ó que sea de tipo jugar con amigo...
   */
  const showPlay = dieState !== EDiceState.HIDE && turnsEnabledTwoPlayers;

  /**
   * Sólo será blanco para dos juagdores si s esta jugando con un amigo
   * De lo contrario, cuando tiene el turno el jugador dos, de los otros tipos
   * el color cambiará a rojo...
   */
  const diceTheme: DiceTheme = EDiceTheme.WHITE;

  // Para validar si se muestra los valores de la tabla...
  // Cuando es el turno del jugador dos, salvo que se este jugando con un amigo
  // no se mostrará estos valores...
  const thrownDice = turnsEnabledTwoPlayers && dieState === EDiceState.STOPPED;

  return (
    <GameWrapper blockContent={blockContent}>
      <Header countdown={countdown} players={players} turn={turn} />
      <Board
        items={boardState}
        players={players}
        thrownDice={thrownDice}
        turn={turn}
        typeGame={typeGame}
        handleClick={(item, player) => {
          console.log(item, player);
        }}
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
