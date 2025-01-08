
const express = require('express');
const { userRoutes } = require('./users');
const { postRoutes } = require('./routes');
const { logRequests } = require('./middleware');
const { authenticateToken } = require('./auth');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(logRequests);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


