import "./styles.css";
import React, { useState } from "react";
import type { IAuth } from "../../../../interfaces";
import { ButtonGroup, PageWrapper } from "../../../wrappers";
import Logo from "../../../logo";
import AvatarImage from "../../../avatarImage";
import { ROOM_SIZE_RANGE_BASE } from "../../../../utils/constants";
import { isAValidRoom, randomNumber } from "../../../../utils/helpers";

interface PlayWithFriendProps {
  state: IAuth;
  handleNewRoom: (data: { room: string; isCreatorRoom: boolean }) => void;
}

const PlayWithFriend = ({ state, handleNewRoom }: PlayWithFriendProps) => {
  // Se obtiene el rango de la sala personalizada a crear...
  const { roomRange = ROOM_SIZE_RANGE_BASE } = state || {};
  const [roomValue, setRoomValue] = useState("");

  const handleCreateRoom = () => {
    /**
     * Crea la sala y específica que es el creador de la misma...
     */
    handleNewRoom({
      room: randomNumber(10 ** (roomRange - 1), 10 ** roomRange - 1).toString(),
      isCreatorRoom: true,
    });
  };

  /**
   * Captura el valor ingresado en el input del nombre de la sala...
   * @param event
   */
  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    /**
     * Valida que el valor ingresado sea un número
     * Además que la extensión sa de menor de cinco o del valor de roomRange
     */
    if (isAValidRoom(value, roomRange) || value === "") {
      setRoomValue(value);
    }
  };

  /**
   * Cuando se envia el formulario...
   * @param event
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Envia el valor de la sala
    // Además específca que no es el creado de la sala...
    handleNewRoom({ room: roomValue, isCreatorRoom: false });
  };

  return (
    <PageWrapper>
      <div className="play-with-friend">
        <Logo />
        <AvatarImage
          photo={state.user?.photo || ""}
          name={state.user?.name || ""}
        />
        <ButtonGroup label="Join Room">
          <form onSubmit={handleSubmit} className="play-with-friend-join">
            <input
              className="play-with-friend-code"
              placeholder="Room code"
              type="tel"
              value={roomValue}
              onChange={handleChangeValue}
            />
            <button
              className="button orange"
              disabled={!(roomValue.length === roomRange)}
            >
              Join
            </button>
          </form>
        </ButtonGroup>
        <h2>OR</h2>
        <ButtonGroup label="New Room">
          <button
            className="button orange play-with-friend-new-room"
            onClick={handleCreateRoom}
          >
            Create Room
          </button>
        </ButtonGroup>
      </div>
    </PageWrapper>
  );
};

export default React.memo(PlayWithFriend);
