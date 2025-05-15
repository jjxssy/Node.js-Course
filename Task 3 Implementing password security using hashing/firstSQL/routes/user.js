const express = require('express');
const router = express.Router();
const dbSingleton = require('./dbSingletons/dbSingletonUsers.js'); // Import the singleton connection module
const connection = dbSingleton.getConnection(); // Get the singleton connection

const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    const query = 'SELECT * FROM users';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error executing SQL query:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
});

router.post('/', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Hash the password with a salt, all in one step
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        connection.query(query, [name, email, hashedPassword], (error, result) => {
            if (error) {
                console.error('Error executing SQL query:', error);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            res.json({ message: 'User registered successfully' });
        });
    } catch (error) {
        console.error('Error hashing password:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:id', (req, res) => {
    const userId = req.params.id;
    const { name, email, password } = req.body;

    // Hash the new password if provided
    let hashedPassword;
    if (password) {
        hashedPassword = bcrypt.hashSync(password, 10);
    }

    const query = 'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?';
    connection.query(query, [name, email, hashedPassword, userId], (error, result) => {
        if (error) {
            console.error('Error executing SQL query:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        console.log('Result:', result);
        // If affectedRows is 0, it means the user ID you're trying to update doesn't exist in the database
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'User not found!' });
            return;
        }
        res.json({ message: 'User updated successfully' });
    });
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM users WHERE email = ?';
    connection.query(query, [email], (error, results) => {
        if (error) {
            console.error('Error executing SQL query:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
    console.log('Result:', results); // array which is the user we found
        const user = results[0];
        bcrypt.compare(password, user.password, (err, result) => {
	if (err) throw err;
	if (result) {
		res.json({ message: 'Login successful', userId: user.id });
	} else
		res.status(401).json({ error: 'Invalid email or password' });
    });
});
});
module.exports = router;

