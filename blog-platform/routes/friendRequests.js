const express = require('express');
const router = express.Router();
const FriendRequest = require('../models/FriendRequest');
const User = require('../models/User');
const verifyToken = require('../middleware/verifyToken');

// Send a friend request
router.post('/send', verifyToken, async (req, res) => {
  const { receiverId } = req.body;

  try {
    const sender = req.user.id;
    const receiver = await User.findById(receiverId);
    
    if (!receiver) {
      return res.status(404).json({ error: 'User not found' });
    }

    const existingRequest = await FriendRequest.findOne({
      sender,
      receiver: receiverId,
      status: 'pending',
    });

    if (existingRequest) {
      return res.status(400).json({ error: 'Friend request already sent' });
    }

    const request = new FriendRequest({ sender, receiver: receiverId });
    await request.save();
    res.status(201).json({ message: 'Friend request sent' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Accept a friend request
router.post('/accept/:requestId', verifyToken, async (req, res) => {
  const { requestId } = req.params;

  try {
    const request = await FriendRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ error: 'Friend request not found' });
    }

    if (request.receiver.toString() !== req.user.id) {
      return res.status(403).json({ error: 'You cannot accept this request' });
    }

    request.status = 'accepted';
    await request.save();
    res.json({ message: 'Friend request accepted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Decline a friend request
router.post('/decline/:requestId', verifyToken, async (req, res) => {
  const { requestId } = req.params;

  try {
    const request = await FriendRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ error: 'Friend request not found' });
    }

    if (request.receiver.toString() !== req.user.id) {
      return res.status(403).json({ error: 'You cannot decline this request' });
    }

    request.status = 'declined';
    await request.save();
    res.json({ message: 'Friend request declined' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
