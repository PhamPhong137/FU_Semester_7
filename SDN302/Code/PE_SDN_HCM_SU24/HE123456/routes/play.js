const express = require('express');
const router = express.Router();
const Player = require('../models/Player');

router.post('/add', ensureAuthenticated, async (req, res) => {
    const { playerName, isCaptain, minutesPlayed, accuracy, positionId } = req.body;

    // Validation logic
    if (!playerName.match(/^[a-zA-Z0-9 ]+$/) || minutesPlayed <= 0 || minutesPlayed >= 1000) {
        return res.status(400).json({ error: 'Invalid data' });
    }

    const player = new Player({ playerName, isCaptain, minutesPlayed, accuracy, positionId });
    await player.save();
    res.redirect('/dashboard');
});

router.post('/edit/:id', ensureAuthenticated, async (req, res) => {
    const player = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.redirect('/dashboard');
});

router.post('/delete/:id', ensureAuthenticated, async (req, res) => {
    await Player.findByIdAndDelete(req.params.id);
    res.redirect('/dashboard');
});


module.exports = router;
