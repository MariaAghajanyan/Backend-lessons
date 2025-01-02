
const express = require('express');
const fs = require('fs').promises;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());


const JWT_SECRET = 'your_jwt_secret';
const USERS_FILE = './users.json';
const POSTS_FILE = './posts.json';
const LOGS_FILE = './logs.json';

const readFile = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
};

const writeFile = async (filePath, data) => {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};


const authenticate = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

const logRequest = async (req, res, next) => {
  const logEntry = {
    method: req.method,
    url: req.originalUrl,
    timestamp: new Date().toISOString(),
  };
  const logs = await readFile(LOGS_FILE);
  logs.push(logEntry);
  await writeFile(LOGS_FILE, logs);
  next();
};

app.use(logRequest);


app.post('/users/register', async (req, res) => {
  const { username, email, password, bio } = req.body;
  const users = await readFile(USERS_FILE);

  if (users.find((user) => user.username === username || user.email === email)) {
    return res.status(400).json({ error: 'Username or email already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: uuidv4(), username, email, password: hashedPassword, bio: bio || '' };
  users.push(newUser);
  await writeFile(USERS_FILE, users);

  res.status(201).json({ message: 'User registered successfully' });
});

app.post('/users/login', async (req, res) => {
  const { username, password } = req.body;
  const users = await readFile(USERS_FILE);
  const user = users.find((u) => u.username === username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ error: 'Invalid username or password' });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET);
  res.json({ token });
});

app.get('/users/:id', async (req, res) => {
  const users = await readFile(USERS_FILE);
  const user = users.find((u) => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });

  res.json({ username: user.username, bio: user.bio });
});

app.put('/users/:id', authenticate, async (req, res) => {
  const { bio } = req.body;
  const users = await readFile(USERS_FILE);
  const user = users.find((u) => u.id === req.params.id);

  if (!user) return res.status(404).json({ error: 'User not found' });
  if (user.id !== req.user.id) return res.status(403).json({ error: 'Unauthorized' });

  user.bio = bio || user.bio;
  await writeFile(USERS_FILE, users);

  res.json({ message: 'Profile updated successfully' });
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
