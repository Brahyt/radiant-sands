const express = require('express');
const route = express.Router();
const foldersRoute = require('./folders-route');
const notesRoute = require('./notes-route');

route
  .use('/folders', foldersRoute)
  .use('/notes', notesRoute);

module.exports = route;
