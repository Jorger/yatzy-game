import "./styles.css";
import { ButtonGroup, PageWrapper } from "../../../wrappers";
import AvatarImage from "../../../avatarImage";
import Loading from "../../../loading";
import Logo from "../../../logo";
import React from "react";
import type { IAuth } from "../../../../interfaces";
import Share from "../../../share";

const WaitOpponent = ({ room, state }: { room: string; state: IAuth }) => {
  const dataShare = {
    title: "Yatzy ReactJS",
    text: "I invite you to play Yatzy",
    url: `${window.location.origin}/online?room=${room}`,
  };

  return (
    <PageWrapper>
      <div className="wait-opponent">
        <Logo />
        <AvatarImage
          photo={state.user?.photo || ""}
          name={state.user?.name || ""}
        />
        {room ? (
          <ButtonGroup label="Private room">
            <div className="wait-opponent-share">
              <Loading />
              <code className="wait-opponent-code">{room}</code>
              <Share data={dataShare}>
                <button className="button orange">Share Code</button>
              </Share>
              <p>Share this room number with your friend</p>
            </div>
          </ButtonGroup>
        ) : (
          <React.Fragment>
            <Loading />
            <h2>Waiting on opponent...</h2>
          </React.Fragment>
        )}
      </div>
    </PageWrapper>
  );
};

export default React.memo(WaitOpponent);
