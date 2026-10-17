const ordersService = require("../services/orders.service");

class OrdersController {
  getHealth(req, res) {
    res.status(200).json({ status: "ok" });
  }

  createOrder(req, res, next) {
    try {
      const createdOrder = ordersService.createOrder(req.body);
      res.setHeader("Location", `/orders/${createdOrder.id}`);
      res.status(201).json(createdOrder);
    } catch (error) {
      next(error);
    }
  }

  getOrders(req, res, next) {
    try {
      const result = ordersService.getAllOrders();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  getOrderById(req, res, next) {
    try {
      const order = ordersService.getOrderById(req.params.id);
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }

  deleteOrder(req, res, next) {
    try {
      ordersService.deleteOrder(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new OrdersController();