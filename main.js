import http from "node:http";
import { WebSocketServer } from "ws";
import express from "express";
import morgan from "morgan";

const app = express();

let counter = 0;

app.use(morgan('tiny'))

app.get('/', (req, res, next) => {
    counter = counter + 1;
    console.log(counter);
    next();
})

app.use(express.static("client"));

const server = http.createServer(app);

const wss = new WebSocketServer({ server });

let buf = "";

wss.on("connection", (ws) => {
    ws.on("message", (message) => {
        buf = buf + message.toString() + "\n";
        console.log(buf);
        for (let i of wss.clients) {
           i.send(message.toString());
        }
    });

    if (buf != "") {
        ws.send(buf);
    }
});

const host = 'localhost';
const port = 8000;

server.listen(port, host, () => {
    console.log(`Server started on http://${host}:${port}`)
})