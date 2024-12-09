const express = require('express');
const router = express.Router();
const Position = require('../models/position');
const jwt = require('jsonwebtoken');

// Middleware to verify JWT
function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// CREATE Position
router.post('/', authenticateToken, async (req, res) => {
  const position = new Position(req.body);
  try {
    await position.save();
    res.status(201).json(position);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// READ Positions
router.get('/', authenticateToken, async (req, res) => {
  const positions = await Position.find();
  res.json(positions);
});

// UPDATE Position
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const position = await Position.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(position);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE Position (with validation)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    // Add your validation logic here
    await Position.findByIdAndDelete(req.params.id);
    res.json({ message: 'Position deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
