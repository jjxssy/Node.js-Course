const express = require('express');
const router = express.Router();
const dbSingleton = require('./dbSingletons/dbSingletonProducts'); // Import the singleton connection module
const connection = dbSingleton.getConnection(); // Get the singleton connection


router.use(express.json()); // Middleware to parse JSON request bodies

router.get('/:id', (req, res) => {
    // Retrieve a product by ID from the database
    const productId = req.params.id;
    const query = 'SELECT * FROM products WHERE id = ?';
    connection.query(query, [productId], (err, results) => {
        if (err) {
            console.error('Error retrieving product:', err);
            res.status(500).json({ error: 'Error retrieving product' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Product not found!' });
            return;
        }
        res.json(results[0]);
    });
});

router.put('/:id', (req, res) => {
    // Update a product by ID in the database
    const productId = req.params.id;
    const { name, price } = req.body;
    const query = 'UPDATE products SET name = ?, price = ? WHERE id = ?';
    connection.query(query, [name, price, productId], (err, result) => {
        if (err) {
            console.error('Error updating product:', err);
            res.status(500).json({ error: 'Error updating product' });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Product not found!' });
            return;
        }
        res.json({ message: 'Product updated successfully' });
    });
});

router.delete('/:id', (req, res) => {
    // Delete a product by ID from the database
    const productId = req.params.id;
    const query = 'DELETE FROM products WHERE id = ?';
    connection.query(query, [productId], (err, result) => {
        if (err) {
            console.error('Error deleting product:', err);
            res.status(500).json({ error: 'Error deleting product' });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Product not found!' });
            return;
        }
        res.json({ message: 'Product deleted successfully' });
    });
});


router.get('/', (req, res) => {
    // Retrieve all products from the database
    connection.query('SELECT * FROM products', (err, results) => {
        if (err) {
            console.error('Error retrieving products:', err);
            res.status(500).json({ error: 'Error retrieving products' 
        });
        return;
        }
        res.json(results);
    });
});

router.get('/', (req, res) => {
    const limit = parseInt(req.query.limit);
    // If a limit is provided and is a valid number, apply it
    if (!isNaN(limit)) {
        const query = 'SELECT * FROM products LIMIT ?';
        connection.query(query, [limit], (err, results) => {
            if (err) {
                console.error('Error retrieving products:', err);
                res.status(500).json({ error: 'Error retrieving products' });
                return;
            }
            res.json(results);
        });
    } else {
        // No limit specified, return all products
        connection.query('SELECT * FROM products', (err, results) => {
            if (err) {
                console.error('Error retrieving products:', err);
                res.status(500).json({ error: 'Error retrieving products' });
                return;
            }
            res.json(results);
        });
    }
});


router.post('/', (req, res) => {
    // Add a new product to the database
    const { id, name, price } = req.body;
    const query = 'INSERT INTO products (id, name, price) VALUES (?, ?, ?)';
    connection.query(query, [id, name, price], (err, result) => {
        if (err) {
            console.error('Error adding product:', err);
            res.status(500).json({ error: 'Error adding product' });
            return;
        }
        res.status(201).json({ message: 'Product added successfully', productId: result.insertId });
    });
});
module.exports = router;