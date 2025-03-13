const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db"); // MySQL connection
const { registerEmployee } = require("../models/userModel");

const router = express.Router();
const SECRET_KEY = "your_secret_key_here"; // Store securely

// Register Route
router.post("/register", async (req, res) => {
  try {
    const { name, address, phone, email, password, role } = req.body;
    const result = await registerEmployee(name, address, phone, email, password, role);
    res.status(201).json({ message: "Employee registered successfully", employeeId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
    
      if (!email || !password) {
        return res.status(400).json({ message: "Missing email or password." });
      }
  
      console.log("Login request received for:", email);
  
      // ✅ Use `execute()` instead of `query()` to work with async/await
      const [results] = await db.execute("SELECT * FROM Stock_Employee WHERE Email = ?", [email]);
      
      if (results.length === 0) {
        return res.status(401).json({ message: "Invalid email or password." });
      }
  
      const user = results[0];
  
      // ✅ Compare password securely
      const isMatch = await bcrypt.compare(password, user.Password); 
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password." });
      }
  
      // ✅ Generate JWT token
      const token = jwt.sign(
        { user_id: user.Employee_ID, email: user.Email, role: user.Role },
        SECRET_KEY,
        { expiresIn: "1h" }
      );
  
      console.log("Login successful for:", email);
      return res.json({ message: "Login successful", token });
  
    } catch (error) {
      console.error("Error in login route:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
  });
  

module.exports = router;
