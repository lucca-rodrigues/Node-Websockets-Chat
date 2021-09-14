import express from "express"

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    return res.json({
        message: "Hello  Websocket"
    })
})

app.listen(port, () => console.log(`server listened on port ${port}`))