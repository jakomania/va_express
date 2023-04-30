// Importing the required modules
const WebSocketServer = require('ws');
var express = require('express');
const { Game } = require("../js/Game.js");

var router = express.Router();



const wss = new WebSocketServer.Server({ port: 8080 })
 
// Creating connection using websocket
wss.on("connection", ws => {
    let gameData = { 
        ke1: 'value1',
        ke2: 'value2',
        ke3: 'value3',
    };

    console.log("new client connected");
 
    // sending message to client
    ws.send(JSON.stringify(gameData));
 
    //on message from client
    ws.on("message", data => {
        console.log(`Client has sent us: ${data}`)
              
    });

    console.log('Sended data:');
    console.log(gameData);
 
    // handling what to do when clients disconnects from server
    ws.on("close", () => {
        console.log("the client has gone!");
    });
    // handling client connection error
    ws.onerror = function () {
        console.log("Some Error occurred")
    }
});
console.log("The WebSocket server is running on port 8080");



module.exports = router