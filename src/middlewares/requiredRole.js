const { AppError } = require("../helpers/error");

// Middleware kiểm tra quyền cần được gọi sau middleware authorization
const requiredRole = (...roles) => {
  return (req, res, next) => {
    const { user } = res.locals;

    const isMatched = roles.includes(user.role);
    if (!isMatched) {
      next(new AppError(403, "have no permission"));
      return;
    }

    next();
  };
};

module.exports = requiredRole;
