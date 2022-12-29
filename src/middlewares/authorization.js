// middleware verify token

const jwt = require("jsonwebtoken");
const { AppError } = require("../helpers/error");
const { User } = require("../models");

const extractTokenFromHeader = (headers) => {
  const bearerToken = headers.authorization; // Bearer abcxyz
  const parts = bearerToken.split(" "); // ["Bearer", "abcxyz"]

  if (parts.length !== 2 || parts[0] !== "Bearer" || !parts[1].trim()) {
    throw new AppError(401, "Invalid token");
  }

  return parts[1];
};

const authorization = async (req, res, next) => {
  try {
    const token = extractTokenFromHeader(req.headers);
    const payload = jwt.verify(token, "cybersoft-node26");

    // Dùng token payload có chứa id của user để lấy đầy đủ thông tin user
    const user = await User.findByPk(payload.id);
    if (!user) {
      throw new AppError(401, "Invalid token");
    }

    // Lưu trữ thông tin user vào res.locals, để có thể truy cập ở các middleware hoặc controller tiếp theo
    res.locals.user = user;

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new AppError(401, "Invalid token"));
    }
    next(error);
  }
};

module.exports = authorization;
