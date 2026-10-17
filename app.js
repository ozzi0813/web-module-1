const express = require("express");
const ordersRouter = require("./src/routes/orders.router");
const errorHandler = require("./src/middlewares/error-handler");

const app = express();

app.use(express.json());
app.use("/", ordersRouter);
app.use(errorHandler);

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;