require('dotenv/config');

// Connect to the database
require('./db');

const express = require('express');

const app = express();

require('./config')(app);

// session configuration

const session = require('express-session');
const MongoStore = require('connect-mongo');
const DB_URL = process.env.MONGODB_URI;

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    // for how long is the user logged in -> this would be one day
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: true,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: DB_URL,
    }),
  })
);
// end of session configuration

const auth = require('./routes/auth');
app.use('/api/auth', auth);

const studio = require('./routes/studio');
app.use('/api', studio);

const artist = require('./routes/artist');
app.use('/api', artist);

const user = require('./routes/user');
app.use('/api', user);

const tattoo = require('./routes/tattoo');
app.use('/api', tattoo);

const collection = require('./routes/collection');
app.use('/api', collection);

const image = require('./routes/image');
app.use('/api', image);

//  handle errors
require('./error-handling')(app);

module.exports = app;
