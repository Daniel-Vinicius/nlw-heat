import 'dotenv/config';
import express from 'express';
import http from "http";
import cors from "cors";
import { Server } from 'socket.io';

import { router } from './routes';

const app = express();
app.use(cors());

const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
  cors: {
    origin: "*"
  }
});

app.use(express.json());
app.use(router);

export { serverHttp, io };
