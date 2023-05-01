import "./styles.css";
import { PageWrapper } from "../../../wrappers";
import AvatarImage from "../../../avatarImage";
import Loading from "../../../loading";
import Logo from "../../../logo";
import React from "react";
import type { IAuth } from "../../../../interfaces";

const WaitOpponent = ({ state }: { state: IAuth }) => {
  return (
    <PageWrapper>
      <div className="wait-opponent">
        <Logo />
        <AvatarImage
          photo={state.user?.photo || ""}
          name={state.user?.name || ""}
        />
        <Loading />
        <h2>Waiting on opponent...</h2>
      </div>
    </PageWrapper>
  );
};

export default React.memo(WaitOpponent);
