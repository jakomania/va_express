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
        console.log(`Recibido JSON del cliente: ${data}`)        
        // Parseamos el JSON recibido
        const json = JSON.parse(data);

        if (json && json['roomInfo'] !== null) { 
            const roomGame = Object.keys(json.roomInfo)[0]; {

            if (json['roomInfo'][roomGame].length == 2 ) {
                console.log('JUEGO EMPEZADO');   
                const game = new Game(json);
                game.getGameData();
                ws.send(JSON.stringify(json));              
            }}
        } else {
            console.log('JUEGO NO EMPEZADO')
        } 
        //game.init();
        


        // Enviamos el mismo JSON de vuelta al cliente
        
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