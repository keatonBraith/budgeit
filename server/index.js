require('dotenv').config();
const express = require('express');
const session = require('express-session');
const app = express();
const massive = require('massive');
const authCtrl = require('./controllers/authController');
const middle = require('./middleware/authMiddleware');

const PORT = 4008;

const { SESSION_SECRET, CONNECTION_STRING, SERVER_PORT } = process.env;

const app = express()

app.use(express.json());

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false }
}).then(db => {
  app.set('db', db);
  console.log('db connected');
}).catch( err => console.log(err));

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`))