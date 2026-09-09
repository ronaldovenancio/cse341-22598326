const routes = require('express').Router();
const temple = require('./temple');

routes.use('/temples', temple);
routes.use(
  '/',
  (docData = (req, res) => {
    let docData = {
      documentationURL: 'https://ronaldovenancio.github.io/cse341-22598326/cse341-w02-team-activity',
    };
    res.send(docData);
  })
);

module.exports = routes;
