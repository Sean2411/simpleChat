import { Message } from "./message.type";

export type RoomMessages = {
  roomName: string,
  messages: Message[];
  id?: number;
  reaction?: string;
}