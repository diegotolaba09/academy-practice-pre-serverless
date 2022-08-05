import { verifyToken } from "../helpers/generateToken.js";
import users from "../schemas/users.js";

export const checkAuth = async (req, res, next) => {
  try {
    const token = getToken(req);

    if (!token) {
      throw { message: "Token is required", status: 401 };
    }

    const tokenData = await verifyToken(token);

    if (!tokenData?._id) {
      throw { message: "Token is invalid", status: 409 };
    }

    next();
  } catch (err) {
    next(err);
  }
};

export const checkRole = (roles) => async (req, res, next) => {
  try {
    const token = getToken(req);
    const tokenData = await verifyToken(token);
    const userData = await users.findById(tokenData._id);

    if (!userData?.role || ![].concat(roles).includes(userData.role)) {
      throw {
        message: `Your ${userData?.role} role not authorized`,
        status: 401,
      };
    }

    next();
  } catch (err) {
    next(err);
  }
};

const getToken = (req) => {
  return req.headers.authorization?.split(" ")?.pop();
};
