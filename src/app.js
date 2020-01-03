require('dotenv').config();
const { NODE_ENV, DATABASE_URL } = require('./config');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const route = require('./routes');
const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: `${DATABASE_URL}`
});

const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(cors());
app.set('db', db)
app.use('/api', route);
app.use(morgan(morganOption));
app.use(helmet());

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
