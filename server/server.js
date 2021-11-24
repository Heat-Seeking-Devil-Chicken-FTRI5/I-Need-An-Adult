const express = require('express');
//path helps you reference a file. it takes you to a specific file .
const path = require('path'); // NEW
const router = express.Router();
const app = express();
const port = process.env.PORT || 3000;

// /dist/ folder path
const DIST_DIR = path.join(__dirname, '../dist');
// ./dist/index.html file path
const HTML_FILE = path.join(DIST_DIR, 'index.html');

// to serve the bundle.js in dist when in production
app.use(express.static(DIST_DIR));
// parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const taskRouter = require('./routes/task.js');
const userRouter = require('./routes/users.js');

// Send GET requests to '/' to index.html
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});

// Routers

// GET REQUEST to '/' serves dashboard

// routes requests to '/task/ to taskRouter
app.use('/api/task', taskRouter);
// routes requests to '/rewards/ to rewardsRouter
app.use('/api/users', userRouter);

// Catch all request handler
app.use('*', (req, res) => {
  res.sendStatus(418)
})

// Global Error Handler
app.use((err, req, res, next) => {
  const defaultError = {
    log: 'Express error handler caught an unknown middleware error',
    status: 500,
    message: { err: 'Internal Service Error' },
  };

  const errorObj = { ...defaultError, ...err };
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// listening to either process.env.PORT || 3000
app.listen(port, function () {
  console.log('App listening on port: ' + port);
});
