import express from 'express';
import { Server } from "socket.io";
import http from "http";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 3000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'https://relaxed-sprinkles-2c088e.netlify.app';


app.use(cors({
  origin: CORS_ORIGIN,
  methods: ['GET', 'POST']
}));

app.get('/', (req, res) => {
  res.send("Server is running");
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log("Received Connection!");

  socket.on("increment", (count)  => {
    console.log(`The current count is ${count}`)
    let newCount = count + 1;
    io.emit('result', { newCount });
  });

  socket.on('disconnect', () => {
    console.log('Player disconnected', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});