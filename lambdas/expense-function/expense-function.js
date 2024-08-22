const mysql = require('mysql2/promise');
const dbConfig = require('./dbConfig');

const getDbConnection = async () => {
    return await mysql.createConnection(dbConfig);
};

exports.handler = async (event) => {
    const { email, amount, description, transactionType } = event;

    if (!email || !amount) {
        return { statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
            },
            body: JSON.stringify({ error: 'Missing required fields' }) };
    }

    try {
        const connection = await getDbConnection();
        
        // Find user ID by email
        const [userRows] = await connection.execute('SELECT user_id FROM users WHERE email = ?', [email]);
        if (userRows.length === 0) {
            await connection.end();
            return { statusCode: 404,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                    "Access-Control-Allow-Headers": "Content-Type, Authorization",
                },
                body: JSON.stringify({ error: 'User not found' }) };
        }
        const userId = userRows[0].user_id;
        
        // Insert transaction
        const [result] = await connection.execute(
            'INSERT INTO transactions (user_id, type, amount, description, transaction_type) VALUES (?, ?, ?, ?, ?)',
            [userId, 'expense', amount, description, transactionType]
        );

        await connection.end();
        return {  statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
            },
            body: JSON.stringify({
                message: "Transaction processed",
            }), };
    } catch (error) {
        console.error(error);
        return { statusCode: 500, 
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
            },
            body: JSON.stringify({ error: 'Database error' }) };
    }
};
