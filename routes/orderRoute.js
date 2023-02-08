const express = require("express");
const ordersController = require("../controllers/ordersController");

const router = express.Router();

router.post("/create", ordersController.createOrder);
router.get("/getAllOrders", ordersController.getOrders);
router.get("/:id", ordersController.getOrder);

module.exports = router;