import express from 'express';
import { Server } from "socket.io";
import http from "http";
import cors from "cors";

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST']
}));

app.get('/', (req, res) => {
  res.send("Server is running");
});

const server = http.createServer(app);
const PORT = process.env.PORT || 10000;

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log("Received Connection!");

  socket.on("increment", ({count})  => {
    console.log(`The current count is ${count}`)
    let newCount = count + 1;
    io.emit('result', { newCount  x});
  });

  socket.on('disconnect', () => {
    console.log('Player disconnected', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});