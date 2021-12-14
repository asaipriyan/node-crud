const express = require("express");
const router = express.Router();
const productLikeController = require("../controllers/product-likes.controller");
// Retrieve all employees
router.get("/", productLikeController.findAll);
// Create a new employee
router.post("/", productLikeController.create);
module.exports = router;
