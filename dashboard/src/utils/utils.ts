import { io } from "socket.io-client";

let socketUrl = "http://localhost:8083";

if (process.env.NODE_ENV === "production") {
  // TODO:
  socketUrl = "";
}

export const socket = io(socketUrl);

export const getShortObjectID = (id: string) => {
  // const len = id?.length;
  return id?.substring(0, 8).toUpperCase();
};
