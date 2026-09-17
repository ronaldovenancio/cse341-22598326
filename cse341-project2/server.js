const express = require('express');
const mongodb = require('./db/connect');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('Movies API');
});

app.use('/', require('./routes'));

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