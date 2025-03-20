import { io } from "socket.io-client";

export const overrideStyle = {
  display: "flex",
  margin: "0 auto",
  height: "24px",
  justifyContent: "center",
  alignItems: "center",
};

export const socket = io("http://localhost:8000");

export const getShortObjectID = (id: string) => {
  // const len = id?.length;
  return id?.substring(0, 8).toUpperCase();
};
