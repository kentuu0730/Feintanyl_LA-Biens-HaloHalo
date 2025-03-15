const db = require("../config/db");
const bcrypt = require("bcrypt");

// Register Employee
const registerEmployee = async (name, address, phone, email, password, role = "employee") => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.execute(
      "INSERT INTO employees (name, address, phone_number, email, password, role) VALUES (?, ?, ?, ?, ?, ?)",
      [name, address, phone, email, hashedPassword, role]
    );
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = { registerEmployee };
