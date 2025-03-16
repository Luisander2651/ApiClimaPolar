const app = require("express");
const router = app.Router();

router.get("/inventory", async (req, res) => {
  res.send("Hello World!");
});

router.post("/inventory/movement", async (req, res) => {
  res.send("Hello World!");
});

router.get("/inventory/history", async (req, res) => {
  res.send("Hello World!");
});

module.exports = router;