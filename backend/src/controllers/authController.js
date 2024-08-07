const bcrypt = require('bcryptjs');
const { getConnection } = require('../models/db');

const register = async (req, res) => {
  const { fullName, email, password, confirmPassword } = req.body;

  if (!fullName || !email || !password || !confirmPassword) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  try {
    const connection = await getConnection();
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;

    await connection.execute(query, [fullName, email, hashedPassword]);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);

    if (error.code === 'ER_DUP_ENTRY') {
      res.status(409).json({ error: 'Email already in use' });
    } else {
      res.status(500).json({ error: 'Error registering user' });
    }
  }
};

const login = async (req, res) => {
  const { email, password, token } = req.body;

  if (!email || !password || !token) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const connection = await getConnection();
    const sqlQuery = `SELECT * FROM users WHERE email = ?`;
    const [results] = await connection.execute(sqlQuery, [email]);

    if (results.length === 0) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Assume the token is valid and user is authenticated
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.user_id,
        fullName: user.name,
        email: user.email,
        createdAt: user.created_at,
      }
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Error logging in user' });
  }
};

module.exports = { register, login };
