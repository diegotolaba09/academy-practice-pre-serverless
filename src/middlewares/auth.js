import { decodeSign, verifyToken } from "../helpers/generateToken.js";

const checkAuth = async (req, res, next) => {
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

const checkRole = (roles) => async (req, res, next) => {
  try {
    const token = getToken(req);
    const { role } = decodeSign(token);

    if (!role || ![].concat(roles).includes(role)) {
      throw {
        message: `Your ${role} role not authorized`,
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

export { checkAuth, checkRole, getToken };
