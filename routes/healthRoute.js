const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  console.log('API health check request');
  res.send(`Blogging API is healthy ;)`);
});

module.exports = { router };
