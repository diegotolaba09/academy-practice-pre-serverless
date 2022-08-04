import bcrypt from "bcryptjs";

export const encrypt = async (textPlain) => {
  const hash = await bcrypt.hash(textPlain, 10); //0404o4ofoto4o
  return hash;
};

export const compare = async (passwordPlain, hashPassword) => {
  return await bcrypt.compare(passwordPlain, hashPassword);
};
