import { Profile } from "passport";

export interface IUser {
  name: string;
  token: string;
  socialType: number;
  socialName: string;
  email?: string;
  photo?: string;
}

export type DoneFunction = (error: any, user?: any) => void;

export interface CallbackData {
  profile: Profile;
  done: DoneFunction;
}

export type CallbackAuth = (data: CallbackData) => void;

export type TypeRoom = "ONLINE" | "FRIEND";
export interface IUserRoom {
  name: string;
  id: string;
  photo?: string;
  socketID?: string;
}

export interface IDataRoom {
  type: TypeRoom;
  room: string;
  timestamp: number;
  isFull: boolean;
  players: IUserRoom[];
}

export type IRoom = Record<string, IDataRoom>;
