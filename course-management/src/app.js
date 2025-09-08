const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const routes = require('./routes');
const { notFound, errorHandler } = require('./middlewares/error.middleware');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api', routes);

app.get('/', (_req, res) => {
  res.json({ status: 'OK', message: 'Course Management API up & running' });
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;
