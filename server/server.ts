import ws from "ws";
import fs from "fs";
const wss = new ws.WebSocketServer({ port: 3002 });

wss.on("connection", (connection) => {
  console.log("WebSocket Server successfully started.");

  connection.on("message", (data) => {
    console.log("opa message");
    console.log("received %s", data instanceof Buffer);
    
  });
});
