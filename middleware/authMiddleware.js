const { config } = require('dotenv');
const { verify } = require('jsonwebtoken');

// DOTENV CONFIG
config();

const JWT_SECRET = process.env.JWT_SECRET;

// VERIFY JWT TOKEN
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  console.log('Login authorization header', req.headers);

  const token = authHeader?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).send(`401 Unauthorized`);
  }

  verify(token, JWT_SECRET, (err, decodedToken) => {
    if (err) {
      console.log(err.message);
      return res.status(401).send(`401 Unauthorized`);
    }

    console.log(decodedToken);
    req.user = decodedToken.id;
    next();
  });
}

module.exports = { verifyToken };
