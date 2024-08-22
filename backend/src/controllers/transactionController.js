const mysql = require('mysql2/promise');
const dbConfig = require('../config/dbConfig');

const getDbConnection = async () => {
    return await mysql.createConnection(dbConfig);
};

const addTransaction = async (req, res) => {
    const { email, type, amount, description, transactionType } = req.body;

    if (!email || !type || !amount || !transactionType) {
        console.log(email, type, amount, transactionType);
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const connection = await getDbConnection();
        
        // Find user ID by email
        const [userRows] = await connection.execute('SELECT user_id FROM users WHERE email = ?', [email]);
        if (userRows.length === 0) {
            await connection.end();
            return res.status(404).json({ error: 'User not found' });
        }
        const userId = userRows[0].user_id;
        
        // Insert transaction
        const [result] = await connection.execute(
            'INSERT INTO transactions ( user_id, type, amount, description, transaction_type) VALUES ( ?, ?, ?, ?, ?)',
            [userId, type, amount, description|| null, transactionType]
        );

        await connection.end();
        res.status(201).json({ message: 'Transaction added successfully', transactionId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
};

module.exports = {
    addTransaction
};
