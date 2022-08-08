const handleErrors = (err, _req, res, _next) => {
  res.status(err.status || 500).json({ message: err.message });
};
export { handleErrors };
