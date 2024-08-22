const express = require('express');
const { addTransaction } = require('../controllers/transactionController');
const router = express.Router();

// Define the POST route for adding transactions
router.post('/', addTransaction);

module.exports = router;
