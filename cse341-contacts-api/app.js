const express = require('express');
const mongodb = require('./db/connect');
const contactsRoutes = require('./routes/contacts');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});


app.use(express.json());

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

app.use('/contacts', contactsRoutes);

mongodb.initDb((error) => {
    if (error) {
        console.error('Unable to connect to MongoDB:', error);
        process.exit(1);
    }

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});