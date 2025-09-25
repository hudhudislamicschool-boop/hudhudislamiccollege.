require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const socketio = require('socket.io');
const rateLimit = require('express-rate-limit');
const messagesRouter = require('./routes/messages');
const messagesRouter = require('./config/test-env');
const messagesRouter = require('./config/database');


const app = express();
const server = http.createServer(app);

// Socket.io config for production
const io = socketio(server, {
  cors: { origin: process.env.FRONTEND_URL || '*' },
  pingTimeout: 60000,
  transports: ['websocket', 'polling'],
});

// Middleware
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(helmet());
app.use(rateLimit({ windowMs: 1 * 60 * 1000, max: 100 }));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// API routes
app.use('/api/messages', messagesRouter);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected.'))
  .catch(err => console.error('MongoDB error:', err));

// Socket.io events
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('sendMessage', async (msg) => {
    if (!msg.text || !msg.user) return;
    io.emit('receiveMessage', msg); // Broadcast
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start server

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Graceful shutdown
process.on('SIGTERM', () => {
  server.close(() => {
    mongoose.disconnect();
    process.exit(0);
  });
});