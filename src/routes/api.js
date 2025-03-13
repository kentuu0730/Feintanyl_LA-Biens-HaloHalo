const express = require("express");
const db = require("../config/db"); // MySQL connection
const router = express.Router();
const app = express();
const bodyParser = require("body-parser");

// Middleware
app.use(bodyParser.json());

const foreignKeyTables = {
    "Products": "Category_ID",
    "Products_Ingredients": ["Product_ID", "Ingredient_ID"],
    "Inventory": "Product_ID",
    "Supplies": "Supplier_ID",
    "Sales": "Discount_ID",
    "Supply_Details": ["Supply_ID", "Product_ID"],
    "Supply_Details_Inventory": ["Supply_ID", "Inventory_ID"],
    "Sales_Details": ["Sales_ID", "Product_ID"],
    "Payment": "Sales_ID",
    "Payment_Type": "Payment_ID",
    "Stock_Out_Details": ["Stock_Out_ID", "Product_ID"]
};

const tables = Object.keys(foreignKeyTables);

// Generate CRUD routes for all tables
tables.forEach(table => {
    // Create
    router.post(`/api/${table}`, (req, res) => {
        console.log("post request received");
        const foreignKeys = foreignKeyTables[table];
        if (Array.isArray(foreignKeys)) {
            for (let key of foreignKeys) {
                if (!req.body[key]) {
                    return res.status(400).json({ error: `${key} is required` });
                }
            }
        } else if (foreignKeys && !req.body[foreignKeys]) {
            return res.status(400).json({ error: `${foreignKeys} is required` });
        }
        
        const sql = `INSERT INTO ${table} SET ?`;
        db.query(sql, req.body, (err, result) => {
            if (err) return res.status(500).json(err);
            res.status(201).json({ message: "Created successfully", id: result.insertId });
        });
    });

    // Read all
    router.get(`/api/${table}`, (req, res) => {
        const sql = `SELECT * FROM ${table}`;
        db.query(sql, (err, results) => {
            if (err) return res.status(500).json(err);
            res.json(results);
        });
    });

    // Read by ID
    router.get(`/api/${table}/:id`, (req, res) => {
        const sql = `SELECT * FROM ${table} WHERE ${table}_ID = ?`;
        db.query(sql, [req.params.id], (err, results) => {
            if (err) return res.status(500).json(err);
            res.json(results[0] || {});
        });
    });

    // Update
    router.put(`/api/${table}/:id`, (req, res) => {
        const sql = `UPDATE ${table} SET ? WHERE ${table}_ID = ?`;
        db.query(sql, [req.body, req.params.id], (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Updated successfully" });
        });
    });

    // Delete with foreign key check
    router.delete(`/api/${table}/:id`, (req, res) => {
        const foreignKeys = foreignKeyTables[table];
        let checkQueries = [];

        if (Array.isArray(foreignKeys)) {
            foreignKeys.forEach(fk => {
                checkQueries.push(`SELECT * FROM ${table} WHERE ${fk} = ? LIMIT 1`);
            });
        } else if (foreignKeys) {
            checkQueries.push(`SELECT * FROM ${table} WHERE ${foreignKeys} = ? LIMIT 1`);
        }

        if (checkQueries.length > 0) {
            let promises = checkQueries.map(query => new Promise((resolve, reject) => {
                db.query(query, [req.params.id], (err, results) => {
                    if (err) return reject(err);
                    resolve(results.length > 0);
                });
            }));

            Promise.all(promises).then(results => {
                if (results.includes(true)) {
                    return res.status(400).json({ error: "Cannot delete record due to foreign key constraints" });
                }
                const sql = `DELETE FROM ${table} WHERE ${table}_ID = ?`;
                db.query(sql, [req.params.id], (err, result) => {
                    if (err) return res.status(500).json(err);
                    res.json({ message: "Deleted successfully" });
                });
            }).catch(err => res.status(500).json(err));
        } else {
            const sql = `DELETE FROM ${table} WHERE ${table}_ID = ?`;
            db.query(sql, [req.params.id], (err, result) => {
                if (err) return res.status(500).json(err);
                res.json({ message: "Deleted successfully" });
            });
        }
    });
});

module.exports = router;
