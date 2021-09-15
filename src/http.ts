import "reflect-metadata";
import express from "express";
import path from "path";
import { createServer } from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";

const app = express();
const port = 3000;
const server = createServer(app);

mongoose.connect("mongodb://localhost/websocketcourse", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.static(path.join(__dirname, "..", "public")));

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("Socket ID:", socket);
});

app.get("/", (req, res) => {
  return res.json({
    message: "Hello  Websocket",
  });
});

export { server, io, port };
