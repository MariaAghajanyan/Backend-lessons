const express = require('express');
const { readFile, writeFile } = require('../utils/file');
const { authenticateToken } = require('../middleware');
const { v4: uuidv4 } = require('uuid');

const postRoutes = express.Router();

postRoutes.post('/', authenticateToken, async (req, res) => {
  const { title, content } = req.body;
  const posts = await readFile('posts.json');

  const newPost = { id: uuidv4(), title, content, author: req.user.username, timestamp: new Date().toISOString(), likes: [], comments: [] };
  posts.push(newPost);
  await writeFile('posts.json', posts);
  res.status(201).json(newPost);
});

postRoutes.get('/', async (req, res) => {
  const { author, keyword } = req.query;
  const posts = await readFile('posts.json');

  const filteredPosts = posts.filter(post => {
    return (!author || post.author === author) &&
           (!keyword || post.title.includes(keyword) || post.content.includes(keyword));
  });

  res.json(filteredPosts);
});

postRoutes.get('/:id', async (req, res) => {
  const posts = await readFile('posts.json');
  const post = posts.find(p => p.id === req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });

  res.json(post);
});

postRoutes.put('/:id', authenticateToken, async (req, res) => {
  const { title, content } = req.body;
  const posts = await readFile('posts.json');
  const post = posts.find(p => p.id === req.params.id);

  if (!post) return res.status(404).json({ message: 'Post not found' });
  if (post.author !== req.user.username) return res.status(403).json({ message: 'Unauthorized' });

  post.title = title || post.title;
  post.content = content || post.content;
  await writeFile('posts.json', posts);
  res.json({ message: 'Post updated successfully' });
});

postRoutes.delete('/:id', authenticateToken, async (req, res) => {
  const posts = await readFile('posts.json');
  const postIndex = posts.findIndex(p => p.id === req.params.id);

  if (postIndex === -1) return res.status(404).json({ message: 'Post not found' });
  if (posts[postIndex].author !== req.user.username) return res.status(403).json({ message: 'Unauthorized' });

  posts.splice(postIndex, 1);
  await writeFile('posts.json', posts);
  res.json({ message: 'Post deleted successfully' });
});

module.exports = { postRoutes };