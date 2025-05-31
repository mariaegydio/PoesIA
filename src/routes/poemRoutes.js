const express = require('express');
const router = express.Router();
const poemController = require('../controllers/poemController');

router.post('/generate', poemController.generatePoem);

router.get('/', poemController.getAllPoems);

module.exports = router;