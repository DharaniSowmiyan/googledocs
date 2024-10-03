import { Server } from 'socket.io';
import Connection from './database/db.js';
import { getDocument, updateDocument } from './controller/document-controller.js';

const PORT = 9000;
Connection();  // Database connection

const express = require('express');
const http = require('http');
const cors = require('cors');

const app = express();

// CORS middleware for Express
app.use(cors({
    origin: true,  // Allowed origins
    methods: ['GET', 'POST'],  // Allowed methods
    credentials: true,  // Allow credentials
    allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
    exposedHeaders: ['Authorization']  // Expose certain headers
}));

const server = http.createServer(app);  // Create HTTP server
// Socket.io server with correct CORS configuration
const io = new Server(server, {
    cors: {
    origin:true,  // Allowed origins
        methods: ['GET', 'POST'],  // Allowed methods
        credentials: true,  // Allow credentials
        allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
        exposedHeaders: ['Authorization']  // Expose headers
    },
    path: '/'
});

// Socket.io connection handling
io.of("/namespace").on('connection', socket => {
    console.log('A user connected');

    socket.on('get-document', async documentId => {
        const document = await getDocument(documentId);
        socket.join(documentId);
        socket.emit('load-document', document.data);

        // Broadcast changes to other users
        socket.on('send-changes', delta => {
            socket.broadcast.to(documentId).emit('receive-changes', delta);
        });

        // Save document data
        socket.on('save-document', async data => {
            await updateDocument(documentId, data);
        });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
