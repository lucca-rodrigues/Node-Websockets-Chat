import express from "express";
import path from "path";
import {createServer} from "http";
import { Server } from "socket.io";

const app = express();
const port = 3000;
const server = createServer(app);

app.use(express.static(path.join(__dirname, "..", "public")));

const io = new Server(server);

io.on("connection", (socket) => {
    console.log("Socket ID:", socket);
})

app.get("/", (req, res) => {
    return res.json({
        message: "Hello  Websocket"
    })
})

server.listen(port, () => console.log(`server listened on port ${port}`))