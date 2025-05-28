const express = require('express');
const connectDB = require('./config/database');
const cookieParser = require('cookie-parser');

const app = express();
const port = 7000;

app.use(express.json());
app.use(cookieParser());

const authRouter = require('./routes/authRouter');
const courseRouter = require('./routes/courseRouter');

app.use('/', authRouter);
app.use('/', courseRouter);

connectDB()
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err);
  });

app.listen(port, () => {
  console.log('Server is running at port 7000');
});
