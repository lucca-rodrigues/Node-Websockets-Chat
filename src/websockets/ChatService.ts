import { io, port } from '../http';

io.on("connect", socket => {
    socket.emit("chat_started", {
        message: `your chat started on port ${port}`
    })
})