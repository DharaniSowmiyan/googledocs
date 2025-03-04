# Google Docs Simulator

# Overview

In today's competitive collaborative workspace, real-time document editing and sharing are essential for efficiency. This project is a simulator of Google Docs, replicating its core functionality to allow users to create, edit, and collaborate on documents in real-time.

# Features

**Real-time Editing**: Multiple users can view and edit the same document simultaneously.

**Rich Text Editing**: Built using Quill to provide a powerful text formatting interface.

**Low Latency Communication**: Implemented with Socket.io for real-time bidirectional messaging.

**Data Persistence**: Uses MongoDB to store and retrieve document data, allowing users to save, load, and continue their work across sessions.

**Modern Web Technologies**: Built with React.js for the frontend, ensuring a smooth and responsive user experience.

# Technologies Used

**Frontend**: React.js, Quill.js

**Backend**: Node.js, Express.js

**Real-time Communication**: Socket.io

**Database**: MongoDB

# Installation & Setup

# 1. Clone the repository

git clone https://github.com/your-username/google-docs-simulator.git
cd google-docs-simulator

# 2. Install dependencies

Frontend

cd client
npm install
npm start

Backend

cd server
npm install
node server.js

# 3. Database Setup

Ensure MongoDB is installed and running

Update the connection string in the backend configuration

# Usage

Open the frontend at http://localhost:3000

Create or open a document

Collaborate with other users in real-time

# Contributing

Feel free to fork this repository and submit pull requests.


