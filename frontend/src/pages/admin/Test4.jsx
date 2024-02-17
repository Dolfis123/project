import React, { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3041");
function Test4() {
  useEffect(() => {
    socket.on("connect", () => {
      socket.on("welcome", (data) => {
        console.log("msg from server", data);
      });
      socket.emit("msg", "Thanks fro connecting!!");
    });
    return () => {
      socket.off("connect");
    };
  }, []);

  return <div>Main</div>;
}

export default Test4;
