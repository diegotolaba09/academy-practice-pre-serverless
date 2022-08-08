import { validationResult } from "express-validator";

const validateResult = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (error) {
    const formatError = new Set(
      error.array().map((data) => `Message: ${data.msg}`)
    );
    res.status(409);
    res.send({ errors: [...formatError] });
  }
};
export { validateResult };
