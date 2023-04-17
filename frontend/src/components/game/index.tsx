// import { valueDice } from "../../interfaces";
// import { BoardItem } from "./components/board/components";
import React from "react";
import { Board } from "./components";

const Game = () => {
  return (
    <div style={{ width: "100%" }}>
      <Board typeGame="ONLINE" />
      {/* <Board /> */}
      {/* {new Array(6).fill(null).map((_, key) => {
        return (
          <BoardItem
            key={key}
            type="UPPER_SECTION"
            label={`Dice ${key + 1}`}
            value={(key + 1) as valueDice}
          />
        );
      })}

      <BoardItem type="LOWER_SECTION" value="THREE_KIND" />
      <BoardItem type="LOWER_SECTION" value="FOUR_KIND" />
      <BoardItem type="LOWER_SECTION" value="FULL_HOUSE" />
      <BoardItem type="LOWER_SECTION" value="SMALL_STRAIGHT" />
      <BoardItem type="LOWER_SECTION" value="LARGE_STRAIGHT" />
      <BoardItem type="LOWER_SECTION" value="YATZY" />
      <BoardItem type="LOWER_SECTION" value="CHANCE" /> */}
    </div>
  );
};

export default React.memo(Game);
