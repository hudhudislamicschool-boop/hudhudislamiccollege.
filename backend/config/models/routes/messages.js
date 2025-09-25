const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Get messages for a channel
router.get('/:channel', async (req, res) => {
  const messages = await Message.find({ channel: req.params.channel }).sort({ createdAt: 1 });
  res.json(messages);
});

// Send new message
router.post('/', async (req, res) => {
  const { user, text, channel } = req.body;
  if (!user || !text || !channel) return res.status(400).json({ error: 'Missing fields' });
  const msg = await Message.create({ user, text, channel });
  res.json(msg);
});

module.exports = router;