import "./styles.css";
import { Options, Links } from "./components";
import { PageWrapper } from "../wrappers";
import { useSounds } from "../../hooks";
import AvatarImage from "../avatarImage";
import CircularButton from "../circularButton";
import Logo from "../logo";
import React, { useContext } from "react";
import UserContext from "../../provider/userContext";

const LobbyGame = () => {
  const { withSound, toggleSound } = useSounds();
  const state = useContext(UserContext);

  return (
    <PageWrapper showBack={false}>
      <div className="lobby-game">
        {state?.isAuth && (
          <AvatarImage
            photo={state.user?.photo || ""}
            name={state.user?.name || ""}
          />
        )}
        <CircularButton
          type={withSound ? "sound-on" : "sound-off"}
          onClick={toggleSound}
        />
        <Logo />
        <Links state={state} />
        <Options isAuth={state?.isAuth ?? false} />
      </div>
    </PageWrapper>
  );
};

export default React.memo(LobbyGame);
