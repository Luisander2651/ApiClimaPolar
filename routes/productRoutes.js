const app = require("express");
const router = app.Router();

router.get("/products", async (req, res) => {
  res.send("Get productos");
});

router.post("/products", async (req, res) => {
  res.send("post productos");
});

router.get("/products/:id", async (req, res) => {
  res.send("get productos id");
});

router.put("/products/:id", async (req, res) => {
  res.send("put productos id");
});

router.delete("/products/:id", async (req, res) => {
  res.send("delete productos id");
});

module.exports = router