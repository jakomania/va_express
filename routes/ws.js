// Importing the required modules
const WebSocketServer = require('ws');
var express = require('express');
const { Game } = require("../js/Game.js");

var router = express.Router();



const wss = new WebSocketServer.Server({ port: 8080 })
 
// Creating connection using websocket
wss.on("connection", ws => {
 
    //on message from client
    ws.on("message", (data) => {        
        // Parseamos el JSON recibido
        const json = JSON.parse(data);
        console.log('Recibido JSON del cliente: ');        
        console.log(json);

        const game = new Game();
                
        if ( game.gameReady(json) ) {             
            // Enviamos el mismo JSON de vuelta al cliente
            ws.send(JSON.stringify( game.gameProcess(json))); 
            console.log('Enviado JSON al cliente: ')        
            console.log(game.gameProcess(json));
            }                                             
    });
    
 
    // handling what to do when clients disconnects from server
    ws.on("close", () => {
        console.log("the client has gone!");
    });
    // handling client connection error
    ws.onerror = () => {
        console.log("Some Error occurred")
    }
});
console.log("The WebSocket server is running on port 8080");



module.exports = router