const sampleMiddlewareFn = (req, res, next) => {
  console.log("Adding sampleMiddlewareFn");
  next();
};

module.exports = {
  sampleMiddlewareFn,
};
