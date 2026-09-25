require('dotenv').config();

const express = require('express');
const session = require('express-session');
const { MongoStore } = require('connect-mongo');

const mongodb = require('./db/connect');
const passport = require('./config/passport');

const app = express();
const port = process.env.PORT || 8080;

app.set('trust proxy', 1);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      dbName: 'movies-api',
      collectionName: 'sessions'
    }),

    cookie: {
      httpOnly: true,
      secure: process.env.RENDER === 'true',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.status(200).send('Movies API');
});

app.use('/', require('./routes'));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);

  if (res.headersSent) {
    return next(err);
  }

  return res.status(500).json({
    message: 'Internal server error.'
  });
});

mongodb
  .initDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Connected to DB and listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });