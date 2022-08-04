import { tokenSign } from "../helpers/generateToken.js";
import { compare, encrypt } from "../helpers/handleBcrypt.js";
import userModel from "../schemas/users.js";

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      throw { message: "User not found", status: 404 };
    }

    const checkPassword = await compare(password, user.password);

    const tokenSession = await tokenSign(user);

    if (!checkPassword) {
      throw { message: "Password is incorrect", status: 404 };
    }

    res.send({ data: user, token: tokenSession });
  } catch (err) {
    next(err);
  }
};

const register = async (req, res) => {
  try {
    const {
      fullName,
      email,
      username,
      password,
      role,
      locations,
      paymentLimit,
      shop,
    } = req.body;

    const passwordHash = await encrypt(password);

    const user = await userModel.create({
      fullName,
      email,
      username,
      password: passwordHash,
      role,
      locations,
      paymentLimit,
      shop,
    });

    res.send({ data: user });
  } catch (err) {
    next(err);
  }
};

export { login, register };
