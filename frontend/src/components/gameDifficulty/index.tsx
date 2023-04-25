import "./styles.css";
import { ButtonGroup, PageWrapper } from "../wrappers";
import { EDifficulty } from "../../utils/constants";
import Logo from "../logo";
import React from "react";
import type { Difficulty } from "../../interfaces";

interface GameDifficultyProps {
  handleDifficulty: (difficulty: Difficulty) => void;
}

const GameDifficulty = ({ handleDifficulty }: GameDifficultyProps) => (
  <PageWrapper>
    <div className="game-difficulty">
      <Logo />
      <ButtonGroup label="Difficulty">
        <div className="game-difficulty-buttons">
          {Object.keys(EDifficulty).map((difficulty) => (
            <button
              className="button orange"
              key={difficulty}
              title={difficulty}
              onClick={() => handleDifficulty(difficulty as Difficulty)}
            >
              {difficulty}
            </button>
          ))}
        </div>
      </ButtonGroup>
    </div>
  </PageWrapper>
);

export default React.memo(GameDifficulty);
