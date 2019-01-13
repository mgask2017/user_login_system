const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();

// Passport config
require('./config/passport')(passport);

//DB Config
const db = require('./config/keys').MongoURI;

//Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true }) //this creates a promise...
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

//EJS (middleware)
app.use(expressLayouts); //this line has to be on top otherwise the layouts won't work
app.set('view engine', 'ejs');

// Bodyparser
app.use(express.urlencoded({ extended: false })); //This allows you to retrieve data from the from using 'req.body' //see 'users.js' file for example

// Express session (middleware)
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Passport middleware
    app.use(passport.initialize());
    app.use(passport.session());

// Connect flash
app.use(flash());

// Global vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

//Routes
app.use('/', require('./routes/index')); //links the index.js file to allow the route to work
app.use('/users', require('./routes/users'));


const PORT = process.env.PORT || process.env.IP; //If developing on VSCODE substitute 'process.env.IP' => 5000 for a local IP address

app.listen(PORT, console.log('Server started on port ${PORT}'));