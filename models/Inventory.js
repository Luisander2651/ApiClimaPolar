require("dotenv").config();

const pool = require("../config/database");

const inventoryModel = {
  getAll: async () => {
    try {
      const [rows] = await pool.query("SELECT * FROM inventory");

      if (rows.length === 0) {
        throw new Error("Inventory not found");
      }
      return rows;

    } catch (error) {
      console.error("Error fetching inventory:", error);
      throw error;
    }
  },

  createMovement: async (movementData) => {
    try {
      const { productId, quantity, movementType } = movementData;

      //validar datos requeridos 
      if (!productId || !quantity || !movementType) {
        throw new Error("All fields are required");
      }

      //validar tipo de movimiento
      if (movementType !== "in" && movementType !== "out") {
        throw new Error("Invalid movement type");
      }

      //validar cantidad
      if (quantity <= 0) {
        throw new Error("Quantity must be a positive number");
      }

      const query = "INSERT INTO inventory (product_id, quantity, movement_type) VALUES (?,?,?)";
      const [result] = await pool.query(query, [productId, quantity, movementType]);

      if (result.affectedRows > 0) {
        return result;
      }

      throw new Error("Failed to create movement");

    } catch (error) {
      console.error("Error creating movement:", error);
      throw error;
    }
  }
}

module.exports = inventoryModel;