const app = require("express");
const router = app.Router();
const userController = require("../controllers/userController");

router.post("/auth/register", userController.register);

router.post("/auth/login", userController.login);

router.get("/users/profile", userController.getAll);

router.put("/users/profile", userController.updateUser);

module.exports = router;