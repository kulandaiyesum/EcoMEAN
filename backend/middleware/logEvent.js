

const logger = (req, res, next) => {
  console.log(`${req.method}\t${req.headers.origin}\t${req.url}`);
  next();
};

module.exports= logger;