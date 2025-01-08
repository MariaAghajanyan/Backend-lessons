const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { readFile, writeFile } = require('../utils/file');
const { authenticateToken } = require('./auth');
const { v4: uuidv4 } = require('uuid');

const userRoutes = express.Router();
const SECRET_KEY = "your_secret_key";

userRoutes.post('/register', async (req, res) => {
  const { username, email, password, bio } = req.body;
  const users = await readFile('users.json');

  if (users.find(user => user.username === username || user.email === email)) {
    return res.status(400).json({ message: 'Username or email already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: uuidv4(), username, email, password: hashedPassword, bio: bio || '' };
  users.push(newUser);
  await writeFile('users.json', users);
  res.status(201).json({ message: 'User registered successfully' });
});

userRoutes.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const users = await readFile('users.json');

  const user = users.find(u => u.username === username);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

userRoutes.get('/:id', async (req, res) => {
  const users = await readFile('users.json');
  const user = users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  res.json({ username: user.username, bio: user.bio });
});

userRoutes.put('/:id', authenticateToken, async (req, res) => {
  const { bio } = req.body;
  const users = await readFile('users.json');
  const user = users.find(u => u.id === req.params.id);

  if (!user) return res.status(404).json({ message: 'User not found' });
  if (user.id !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });

  user.bio = bio || user.bio;
  await writeFile('users.json', users);
  res.json({ message: 'Profile updated successfully' });
});

module.exports = { userRoutes }