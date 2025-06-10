const path= require('path');
const bodyParser = require('body-parser');
const express = require('express');
const fileUpload = require('express-fileupload');
debugger;

const eventRoutes = require('./routes/events');
const authRoutes = require('./routes/auth');
const tagRoutes = require('./routes/tags');
const postRoutes = require('./routes/posts');
const cdnRoutes = require('./routes/cdn');




const app = express();

app.use(express.static(path.join(__dirname, 'routes','cdn-images')));

app.use(express.json({
  limit: '10mb'
}));

app.use(express.urlencoded({
  limit: '10mb',
  extended: true,
  parameterLimit: 50000
}));

// app.use(fileUpload({
//   limits: { fileSize: 50 * 1024 * 1024 },
// }));


// app.post('/upload', (req, res) => {
//   if (!req.files) {
//     return res.status(400).send('No file uploaded');
//   }

//   console.log(req.files); // Should print file info
//   res.send('File received');
// });

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
app.use('/cdn', cdnRoutes);

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong.';
  res.status(status).json({
    message: message
  });
});

app.listen(8080);