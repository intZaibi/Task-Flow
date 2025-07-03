import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

let tasks = [
  {
    id: '1',
    text: 'Research Project',
    status: 'TODO',
  },
  {
    id: '2',
    text: 'Design System',
    status: 'TODO',
  },
  {
    id: '3',
    text: 'API Integration',
    status: 'IN_PROGRESS',
  },
  {
    id: '4',
    text: 'Testing',
    status: 'DONE',
  },
];

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {

  socket.emit('initialTasks', tasks);

  socket.on('updateTasks', (newTasks) => {
    tasks = newTasks;
    io.emit('tasksUpdated', newTasks);
  });
});



  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});