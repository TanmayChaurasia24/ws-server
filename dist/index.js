"use strict";
// using http lib or using core node.js
/*
import WebSocket, { WebSocketServer } from "ws";  // Import WebSocket and WebSocketServer from the 'ws' library
import http, { IncomingMessage, ServerResponse } from 'http';  // Import HTTP module

// Create an HTTP server that will handle standard HTTP requests
const server = http.createServer(function (req: IncomingMessage, res: ServerResponse) {
    console.log(new Date() + ' - Request received for ' + req.url);  // Log incoming request URL
    res.end("hi there");  // Send a simple response
});

// Create a WebSocket server and bind it to the HTTP server
const wss = new WebSocketServer({ server });

// Handle WebSocket connections
wss.on('connection', function connection(socket) {
    // 'socket' is the specific connection object for each client connected to the WebSocket server

    // Handle any error events for the WebSocket connection
    socket.on('error', console.error);

    // Handle messages from clients
    socket.on('message', function message(data, isBinary) {
        // Broadcast the message to all connected clients
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {  // Check if the client is still connected
                client.send(data, { binary: isBinary });  // Send the message to each client, preserving binary format if needed
            }
        });
    });

    // Send a welcome message to the newly connected client
    socket.send('hello! message from server');
});

// Start the server on port 8080
server.listen(8080, function () {
    console.log(new Date() + ' - Server is listening on port 8080');
});
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// using express.js 
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
const app = (0, express_1.default)();
const httpServer = app.listen(8080, () => {
    console.log('listening on port 8080');
});
const wss = new ws_1.WebSocketServer({ server: httpServer });
wss.on('connection', function connection(ws) {
    ws.on('error', console.error);
    ws.on('message', function message(data, isBinary) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === ws.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });
    });
    ws.send('Hello! Message From Server!!');
});
