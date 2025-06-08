const bodyParser = require('body-parser');
const express = require('express');
debugger;

const eventRoutes = require('./routes/events');
const authRoutes = require('./routes/auth');
const tagRoutes = require('./routes/tags');
const postRoutes = require('./routes/posts');

const app = express();
app.use(express.json({
  limit: '10mb'
}));

app.use(express.urlencoded({
  limit: '10mb',
  extended: true,
  parameterLimit: 50000
}));

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  next();
});

app.use('/users', authRoutes);
app.use('/events', eventRoutes);
app.use('/tags', tagRoutes);
app.use('/posts', postRoutes);

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong.';
  res.status(status).json({
    message: message
  });
});

app.listen(8080);