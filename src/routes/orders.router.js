const express = require("express");
const ordersController = require("../controllers/orders.controller");

const router = express.Router();

router.get("/health", ordersController.getHealth);
router.post("/orders", ordersController.createOrder);
router.get("/orders", ordersController.getOrders);
router.get("/orders/:id", ordersController.getOrderById);
router.delete("/orders/:id", ordersController.deleteOrder);

module.exports = router;