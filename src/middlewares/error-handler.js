function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const errorCode = err.code || "INTERNAL_SERVER_ERROR";

  res.status(statusCode).json({
    error: {
      code: errorCode,
      message: err.message,
      ...(err.details && { details: err.details }),
    },
  });
}

module.exports = errorHandler;