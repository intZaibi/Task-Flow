"use client";

import { io } from "socket.io-client";

export const socket = io("http://localhost:3000",{
  autoConnect: true,    
  transports: ['websocket'], 
});


socket.on("connect", () => {
  console.log("Connected to server ✅");
});

socket.on("disconnect", () => {
  console.log("sever disconnected ❌");
});



