import { USER_ROLES } from "../constants/utils.js";
import { decodeSign } from "../helpers/generateToken.js";
import { getToken } from "../middlewares/auth.js";

const getUserAuth = (req) => {
  const token = getToken(req);
  const { role, _id: userId } = decodeSign(token);
  return { role, userId };
};

const isEditorNotAuthorized = (role, shop, userId) =>
  role === USER_ROLES.EDITOR && !shop.users.includes(userId);

export { getUserAuth, isEditorNotAuthorized };
