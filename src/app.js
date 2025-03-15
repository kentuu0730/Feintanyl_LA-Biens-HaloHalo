const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const apiRoutes = require("./routes/api");
const path = require('path');
const app = express();


// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../pages/static')));
app.use(express.static(path.join(__dirname, '../')));

// Routes
app.use("/api/employees", userRoutes);
app.use("/endpoints", apiRoutes);


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/static/inventory.html'));
});

app.get('/dashboard/suppliers', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/static/suppliers.html'));
});

app.get('/pages/add_item', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/static/addNewItem.html'));
});

app.get('/pages/edit_item', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/static/editItem.html'));
});

app.get('/pages/add_supplier', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/static/addSuppliers.html'));
});

module.exports = app;
