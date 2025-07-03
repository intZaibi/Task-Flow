"use client";

import { Context } from "@/app/context/Context";
import { Task } from "@/types/types";
import { useContext } from "react";
import { io } from "socket.io-client";

export const socket = io();

// const { setTasks } = useContext(Context);

// const handleInitialTasks = (initialTasks: Task[]) => {
//   console.log(initialTasks);
//   setTasks(initialTasks);
// };

socket.on("connect", () => {
  console.log("Connected to server ✅");
});

socket.on("disconnect", () => {
  console.log("sever disconnected ❌");
});

// socket.on("initialTasks", handleInitialTasks);

