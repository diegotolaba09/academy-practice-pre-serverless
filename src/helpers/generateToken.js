import jwt from "jsonwebtoken";

const verifyToken = async (token) => {
  try {
    return await jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

const tokenSign = async (user) => {
  return await jwt.sign(
    {
      _id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "2h",
    }
  );
};

const decodeSign = (token) => {
  return jwt.decode(token, null);
};

export { verifyToken, tokenSign, decodeSign };
