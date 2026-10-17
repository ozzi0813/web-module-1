const crypto = require("node:crypto");

class OrdersService {
  constructor() {
    this.orders = new Map();
  }

  calculateTotal(items) {
    return items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  }

  validateOrderInput(data) {
    const details = [];

    const customerName = typeof data.customerName === "string" ? data.customerName.trim() : "";
    if (!customerName) {
      details.push("customerName is required and cannot be empty.");
    }

    if (!Array.isArray(data.items) || data.items.length === 0) {
      details.push("items must be a non-empty array.");
    } else {
      data.items.forEach((item, idx) => {
        if (!item.name || typeof item.quantity !== "number" || typeof item.price !== "number") {
          details.push(`Item at index ${idx} is invalid.`);
        }
      });
    }

    if (details.length > 0) {
      const error = new Error("Validation failed");
      error.statusCode = 400;
      error.code = "VALIDATION_ERROR";
      error.details = details;
      throw error;
    }

    return {
      customerName,
      items: data.items,
    };
  }

  createOrder(data) {
    const validData = this.validateOrderInput(data);
    const id = `ord-${crypto.randomUUID()}`;
    const total = this.calculateTotal(validData.items);

    const order = {
      id,
      customerName: validData.customerName,
      total,
      status: "created",
      items: validData.items,
      createdAt: new Date().toISOString(),
    };

    this.orders.set(id, order);
    return order;
  }

  getAllOrders() {
    const ordersList = Array.from(this.orders.values());
    return {
      count: ordersList.length,
      orders: ordersList,
    };
  }

  getOrderById(id) {
    const order = this.orders.get(id);
    if (!order) {
      const error = new Error("Order not found");
      error.statusCode = 404;
      error.code = "ORDER_NOT_FOUND";
      throw error;
    }
    return order;
  }

  deleteOrder(id) {
    if (!this.orders.has(id)) {
      const error = new Error("Order not found");
      error.statusCode = 404;
      error.code = "ORDER_NOT_FOUND";
      throw error;
    }
    this.orders.delete(id);
  }
}

module.exports = new OrdersService();