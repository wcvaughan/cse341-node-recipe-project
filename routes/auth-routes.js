const express = require('express');
const passport = require('../config/passport-config');
const router = express.Router();

// GitHub Authentication
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// GitHub OAuth Callback
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/' }), 
(req, res) => {
    res.redirect('/profile');
});

// Logout Route
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) return res.status(500).send('Logout failed');
        res.redirect('/');
    });
});

// Protected Profile Route
router.get('/profile', (req, res) => {
    if (!req.isAuthenticated()) return res.redirect('/');
    res.json(req.user);
});

module.exports = router; // Export as `authRouter` in index.js if preferred
