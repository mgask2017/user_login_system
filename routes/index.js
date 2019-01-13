const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth'); //protects a access to a page using 'ensureAuthenticated'

// Welcome Page
router.get('/', (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => 
    res.render('dashboard', {
        name: req.user.name //passes in object to show the 'username'
    })); //adding 'ensureAuthenticated' protects a page


module.exports = router;