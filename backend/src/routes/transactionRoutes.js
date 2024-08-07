const express = require('express');
const upload = require('../middlewares/upload');
const { addTransaction } = require('../controllers/transactionController'); // Ensure this is correctly imported
const router = express.Router();

// Route to handle transaction submission
router.post('/', upload.single('pdfFile'), addTransaction);

module.exports = router;
