const dotenv = require('dotenv');

// load .env before anything that reads it
dotenv.config();

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;

const passport = require('./config/passport');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

// trust Render's TLS proxy so secure cookies and req.protocol/IP work correctly
app.set('trust proxy', 1);

app.use(
  cors({
    origin: true,
    credentials: true
  })
);

app.use(express.json());

// session + passport for login
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'change_this_session_secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes'));

app.use(notFound);
app.use(errorHandler);

module.exports = app;
