const mysql = require('mysql2/promise');
const dbConfig = require('./dbConfig');

const getDbConnection = async () => {
    return await mysql.createConnection(dbConfig);
};

exports.handler = async (event) => {
    const { email } = event;

    if (!email) {
        return {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin": "*", // Adjust this as needed
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
            },
            body: JSON.stringify({ error: 'Email is required' })
        };
    }

    try {
        const connection = await getDbConnection();

        // Find user ID by email
        const [userRows] = await connection.execute('SELECT user_id FROM users WHERE email = ?', [email]);
        if (userRows.length === 0) {
            await connection.end();
            return {
                statusCode: 404,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Adjust this as needed
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                    "Access-Control-Allow-Headers": "Content-Type, Authorization",
                },
                body: JSON.stringify({ error: 'User not found' })
            };
        }
        const userId = userRows[0].user_id;

        // Retrieve transactions
        const [transactionRows] = await connection.execute(
            'SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC',
            [userId]
        );

        await connection.end();

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", // Adjust this as needed
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
            },
            body: JSON.stringify(transactionRows)
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*", // Adjust this as needed
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
            },
            body: JSON.stringify({ error: 'Database error' })
        };
    }
};
