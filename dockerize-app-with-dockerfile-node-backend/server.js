const express = require('express');
const app = express();

const PORT = 8080;

// Middleware to parse JSON
app.use(express.json());

// Home endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Node.js Backend API!',
    timestamp: new Date().toISOString()
  });
});

// Hello endpoint with optional name parameter
app.get('/api/hello', (req, res) => {
  const name = req.query.name || 'World';
  res.json({
    message: `Hello, ${name}!`,
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    time: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Server starting on port ${PORT}...`);
});
