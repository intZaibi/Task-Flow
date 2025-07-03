"use client";

import { io } from "socket.io-client";

export const socket = io("http://localhost:3000",{
  autoConnect: true,    
  transports: ['websocket'], 
});


socket.on("connect", () => {
  console.log("Connected to server ✅");
});

socket.on('connect_error', (err) => {
  console.error('Connection failed:', err.message);
});

socket.on('reconnect', (attempt) => {
  console.log('Reconnected on attempt', attempt);
});

socket.on('disconnect', (reason) => {
  console.warn('Disconnected:', reason);
});



