/**
 * @fileoverview MySQL database configuration using mysql2/promise.
 * This module initializes a connection pool for MySQL database operations.
 * 
 * @module database
 */

const mysql = require("mysql2/promise");

/**
 * Database connection pool configuration.
 * 
 * @type {import('mysql2/promise').Pool}
 * @description Creates a connection pool with the following configuration:
 * - Uses environment variables for credentials.
 * - Supports a maximum of 10 concurrent connections.
 * - Has an unlimited queue for pending connections.
 * - Manages connections automatically.
 * 
 * @example
 * const pool = require('./database');
 * async function fetchData() {
 *   const [rows] = await pool.query("SELECT * FROM users");
 *   console.log(rows);
 * }
 * fetchData();
 */
const pool = mysql.createPool({
  host: process.env.DB_HOST,       // Database host (e.g., localhost, 127.0.0.1)
  user: process.env.DB_USER,       // Database username
  password: process.env.DB_PASSWORD, // Database password
  database: process.env.DB_NAME,   // Database name
  waitForConnections: true,        // Wait if all connections are busy
  connectionLimit: 10,             // Maximum concurrent connections
  queueLimit: 0,                   // Unlimited pending connections
});

/**
 * Environment Variables Required:
 * - DB_HOST: MySQL server address
 * - DB_USER: MySQL username
 * - DB_PASSWORD: MySQL password
 * - DB_NAME: Database name
 * 
 * Ensure to create a `.env` file and define these variables before running the application.
 */

module.exports = pool;
