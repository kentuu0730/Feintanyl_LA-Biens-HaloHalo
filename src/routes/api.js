const express = require("express");
const db = require("../config/db"); // MySQL connection
const router = express.Router();
const app = express();
const bodyParser = require("body-parser");

// Middleware
app.use(bodyParser.json());
// Get all products
router.get('/products', async (req, res) => {   
    try {
        const [results] = await db.query('SELECT * FROM products');
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a single product by ID
router.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [results] = await db.query('SELECT * FROM products WHERE product_id = ?', [id]);
        if (results.length === 0) return res.status(404).json({ message: 'Product not found' });
        res.json(results[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a new product
router.post('/products', async (req, res) => {
    try {
        const { category, name, price, quantity, expiration_date } = req.body;
        const [result] = await db.query('INSERT INTO products (category, name, price, quantity, expiration_date) VALUES (?, ?, ?, ?, ?)', 
            [category, name, price, quantity, expiration_date]);
        res.json({ message: 'Product added successfully', product_id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a product
router.put('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { category, name, price, quantity, expiration_date } = req.body;
        await db.query('UPDATE products SET category = ?, name = ?, price = ?, quantity = ?, expiration_date = ? WHERE product_id = ?', 
            [category, name, price, quantity, expiration_date, id]);
        res.json({ message: 'Product updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a product
router.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM products WHERE product_id = ?', [id]);
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Get all suppliers
router.get('/suppliers', async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM suppliers');
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a single supplier by ID
router.get('/suppliers/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [results] = await db.query('SELECT * FROM suppliers WHERE supplier_id = ?', [id]);
        if (results.length === 0) return res.status(404).json({ message: 'Supplier not found' });
        res.json(results[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a new supplier
router.post('/suppliers', async (req, res) => {
    try {
        const { name, address, phone_number, email } = req.body;
        const [result] = await db.query('INSERT INTO suppliers (name, address, phone_number, email) VALUES (?, ?, ?, ?)', 
            [name, address, phone_number, email]);
        res.json({ message: 'Supplier added successfully', supplier_id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a supplier
router.put('/suppliers/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, address, phone_number, email } = req.body;
        await db.query('UPDATE suppliers SET name = ?, address = ?, phone_number = ?, email = ? WHERE supplier_id = ?', 
            [name, address, phone_number, email, id]);
        res.json({ message: 'Supplier updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a supplier
router.delete('/suppliers/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM suppliers WHERE supplier_id = ?', [id]);
        res.json({ message: 'Supplier deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



module.exports = router;
