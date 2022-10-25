const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userModel = require('./models/user');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/db',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/user/create', async (req, res) => {
  const { username } = req.body;

  // Create a new user in the database
  const newUser = await userModel.create({
    username,
  });

  res.json({
    message: 'User created successfully',
    data: newUser,
  });
});

app.get('/users', async (req, res) => {
  // Get all users from the database
  const users = await userModel.find({});

  res.json({
    message: 'Users fetched successfully',
    data: users,
  })
});

app.listen(4000, () => {
  console.log('Server started on port 4000');
});