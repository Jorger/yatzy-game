import "./styles.css";
import React from "react";
import type { IAuth, IOnlineOptions, TypeRoom } from "../../../../interfaces";
import { ButtonGroup, PageWrapper } from "../../../wrappers";
import Logo from "../../../logo";
import AvatarImage from "../../../avatarImage";

const OPTIONS: IOnlineOptions[] = [
  {
    type: "ONLINE",
    label: "Online",
  },
  {
    type: "FRIEND",
    label: "VS a Friend",
  },
];

interface OnlineOptionsProps {
  state: IAuth;
  handleSelectType: (type: TypeRoom) => void;
}

const OnlineOptions = ({ state, handleSelectType }: OnlineOptionsProps) => (
  <PageWrapper>
    <div className="online-options">
      <Logo />
      <AvatarImage
        photo={state.user?.photo || ""}
        name={state.user?.name || ""}
      />
      <ButtonGroup label="Options">
        <div className="online-options-buttons">
          {OPTIONS.map(({ type, label }) => (
            <button
              className="button orange"
              key={type}
              onClick={() => handleSelectType(type)}
            >
              {label}
            </button>
          ))}
        </div>
      </ButtonGroup>
    </div>
  </PageWrapper>
);

export default React.memo(OnlineOptions);
