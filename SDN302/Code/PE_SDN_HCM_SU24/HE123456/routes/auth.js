const express = require('express');
const router = express.Router();
const Member = require('../models/member');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
  const { key, password } = req.body;
  const member = await Member.findOne({ key });

  if (!member) return res.status(400).json({ error: 'Invalid key or password' });

  const isMatch = await member.comparePassword(password);
  if (!isMatch) return res.status(400).json({ error: 'Invalid key or password' });

  // Sign JWT token
  const token = jwt.sign({ id: member._id, key: member.key }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true });
  res.redirect('/dashboard');
});

router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
});

module.exports = router;
