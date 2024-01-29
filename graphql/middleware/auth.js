const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server');

const getUser = (context) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET);

        return user;
      } catch (err) {
        throw new AuthenticationError('Invalid/Expired token');
      }
    }
    throw new AuthenticationError("Authentication token must be Bearer [token]");
  }
  throw new AuthenticationError('Authorization header must be provided');
};

module.exports = {
  getUser
};
