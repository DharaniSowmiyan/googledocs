import { Server } from 'socket.io';
import Connection from './database/db.js';
import { getDocument, updateDocument } from './controller/document-controller.js'
const PORT = 9000;
Connection();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

app.use(cors({
    origin: ['http://localhost:3000', 'https://googledocs-pink.vercel.app'], 
    methods: ['GET', 'POST'],  
    credentials: true,  
    allowedHeaders: ['Content-Type', 'Authorization'], 
    exposedHeaders: ['Authorization'] 
}));
const io = new Server(PORT, {
    cors: {
        origin: ['http://localhost:3000','https://googledocs-a578.vercel.app/'],
        methods: ['GET', 'POST'],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization'], 
        exposedHeaders: ['Authorization']
        
    }
});
io.on('connection', socket => {
    socket.on('get-document', async documentId => {
        const document = await getDocument(documentId);
        socket.join(documentId);
        socket.emit('load-document', document.data);
        socket.on('send-changes', delta => {
            socket.broadcast.to(documentId).emit('receive-changes', delta);
        })
        socket.on('save-document', async data => {
            await updateDocument(documentId, data);
        })
    })
});