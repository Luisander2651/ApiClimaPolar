require("dotenv").config();

const pool = require("../config/database");

const productModel = {
  getAll: async () => {
    const [rows] = await pool.query("SELECT * FROM products");

    if (rows.length === 0) {
      throw new Error("Product not found");
    }

    return { rows };
  },

  getProductById: async (productId) => {
    const [rows] = await pool.query("SELECT * FROM products WHERE id =?", [
      productId,
    ]);

    if (rows.length === 0) {
      throw new Error("Product not found");
    }

    return rows[0];
  },

  createProduct: async (productData) => {
    const { name, description, cost, sell, stock, category } = productData;

    const query =
      "INSERT INTO products (name, description, cost, sell,stock, category) VALUES (?, ?, ?, ?, ?, ?)";
    const [result] = await pool.query(query, [
      name,
      description,
      cost,
      sell,
      stock,
      category,
    ]);

    if (result.affectedRows === 0) {
      throw new Error("Failed to create product");
    }

    return result;
  },

  updateProduct: async (productId, productData) => {
    try {
      const [existingProduct] = await pool.query(
        "SELECT * FROM products WHERE id = ?",
        [productId]
      );

      const ifExists = existingProduct.length > 0;

      if (!ifExists) {
        throw new Error("Product not found");
      }

      const { name, description, cost, sell, stock, category } = productData;

      if (!name || !description || !cost || !sell || !stock || !category) {
        throw new Error("All fields are required");
      }

      const query =
        "UPDATE products SET name = ?, description = ?, cost = ?, sell = ?, stock = ?, category = ? WHERE id = ?";

      const [result] = await pool.query(query, [
        name,
        description,
        cost,
        sell,
        stock,
        category,
        productId,
      ]);

      if (result.affectedRows > 0) {
        const [updateProduct] = await pool.query(
          "SELECT * FROM products WHERE id =?",
          [productId]
        );
        return updateProduct[0];
      }

      return { error: "No se pudo actualizar el producto" };
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      throw new Error(error.message);
    }
  },

  deleteProduct: async (productId) => {
    try {
      const [existingProduct] = await pool.query(
        "SELECT * FROM products WHERE id =?",
        [productId]
      );

      const ifExists = existingProduct.length > 0;

      if (!ifExists) {
        throw new Error("Product not found");
      }
      const query = "DELETE FROM products WHERE id =?";

      const [result] = await pool.query(query, [productId]);

      if (result.affectedRows > 0) {
        return { message: "Product deleted successfully" };
      }

      return { error: "No se pudo eliminar el producto" };
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      throw new Error(error.message);
    }
  },
};

module.exports = productModel;
