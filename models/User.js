require("dotenv").config();

const pool = require("../config/database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userModel = {
  getAll: async () => {
    const [rows] = await pool.query("SELECT * FROM users");
    const { password, ...userWithoutPassword } = rows;
    return { rows: userWithoutPassword };
  },

  createUser: async (userData) => {
    const { name, username, email, password } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      "INSERT INTO users (name, username, email, password) VALUES (?, ?, ?, ?)",
      [name, username, email, hashedPassword]
    );
    return result;
  },

  login: async (userData) => {
    const { username, password } = userData;

    if (!username || !password) {
      throw new Error("Username and password are required");
    }

    const [rows] = await pool.query(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password]
    );
    
    if (rows.length === 1) {
      const user = rows[0];
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const secret = process.env.JWT_SECRET;
        const token = jwt.sign({ userId: user.id }, secret, {
          expiresIn: "1h",
        });
        const { password, ...userWithoutPassword } = user;
        return { user: userWithoutPassword, token };
      }
    }
    return null;
  },

  updateUser: async (id, userData) => {
    try {
      const [existingUser] = await pool.query(
        "SELECT * FROM users WHERE id = ?",
        [id]
      );
      if (existingUser.length === 0) {
        return { error: "User not found" };
      }

      const { name, username, email } = userData;
      if (!name || !username || !email) {
        return { error: "All fields are required" };
      }

      //Actuializar el usuario
      const [result] = await pool.query(
        "update users set name =?, username =?, email =? where id =?",
        [name, username, email, id]
      );
      if (result.affectedRows > 0) {
        const [updatedUser] = await pool.query(
          "SELECT id, name, username, email FROM users WHERE id = ?",
          [id]
        );
        return { user: updatedUser[0] };
      }

      return { error: "No se pudo actualizar el usuario" };
    
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      return { error: "Internal server error" };
    }
  },
};

module.exports = userModel;