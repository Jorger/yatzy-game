import "./styles.css";
import { LABELS_GAME } from "../../../../utils/constants";
import { ScoreValue } from "./components";
import { useNavigate } from "react-router-dom";
import CircularButton from "../../../circularButton";
import FocusTrap from "focus-trap-react";
import Icon from "../../../icon";
import React, { useEffect, useState } from "react";
import Share from "../../../share";
import type { Player } from "../../../../interfaces";

interface ScoreGameProps {
  players: Player[];
}

const ScoreGame = ({ players }: ScoreGameProps) => {
  const navigate = useNavigate();
  const [scoreCounter, setScoreCounter] = useState(0);
  const [showElements, setShowElements] = useState(false);

  /**
   * Efecto que se ejecuta cuando el número del contador del score cambia
   * En este caso se compara con el total de jugadores
   * cuando es igual, quiere decir que el conteo ha terminado y muestra los demás
   * elementos del UI
   */
  useEffect(
    () => setShowElements(scoreCounter === players.length),
    [scoreCounter, players]
  );

  const scoreMessage =
    players.length === 1
      ? LABELS_GAME.AMAZING_SCORE
      : players[0].score === players[1].score
      ? LABELS_GAME.TIE
      : players[0].score > players[1].score
      ? LABELS_GAME.WON
      : LABELS_GAME.LOSE;

  /**
   * Para el mensaje que se comparte en la opción share...
   */
  const dataShare = {
    title: "Yatzy ReactJS",
    text: `I got a score of ${players[0].score} points in Yatzy ReactJS.`,
    url: window.location.origin,
  };

  /**
   * Se agrega FocusTrap para evitar que se navegue con el teclado
   * cuando se muestra el modal del score
   */
  return (
    <FocusTrap>
      <div className="score-game">
        <div className={`score-game-wrapper ${showElements ? "show" : ""}`}>
          {/* Se deja visible por defecto un botón, para que tenga el focus */}
          <CircularButton onClick={() => navigate("/")} />
          <div className="score-game-value">
            {players.map(({ id, score, name }, key) => (
              <ScoreValue
                index={key + 1}
                key={id}
                name={players.length === 2 ? name : ""}
                score={score}
                handleShowScore={() => setScoreCounter((value) => value + 1)}
              />
            ))}
          </div>
          <div className="score-game-message">{scoreMessage}</div>
          <div className="score-game-buttons">
            <button
              className="button orange score-game-buttons-play"
              onClick={() => navigate("/")}
            >
              Play Again
            </button>
            <div className="score-game-buttons-bottom">
              <button title="Return to lobby" onClick={() => navigate("/")}>
                <Icon type="full-house" fill="white" />
              </button>
              <Share data={dataShare}>
                <button title="Share">
                  <Icon type="share" fill="white" />
                </button>
              </Share>
            </div>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
};

export default React.memo(ScoreGame);
