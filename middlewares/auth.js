const { verifyWebToken } = require('../utils/jwt');
const UnauthorizedError = require('../errors/unauthorized-error');

async function auth(req, res, next) {
  // const { authorization } = req.headers;
  // const { cookie } = req.headers;
  // const token = cookie.replace('jwt=', '');
  // const token = req.headers.authorization.replace('Bearer ', '');
  const token = req.headers.authorization;
  // req.headers.authorization = token;
  console.log(token);
  // console.log(req.headers)
  let payload;

  try {
    payload = await verifyWebToken(token);

    if (!token || verifyWebToken(token) === false) {
      return next(new UnauthorizedError('Запрещено.'));
    }
  } catch (err) {
    return next(new UnauthorizedError('Запрещено.'));
  }

  if (!token || verifyWebToken(token) === false) {
    return next(new UnauthorizedError('Запрещено.'));
  }

  req.user = payload;

  // console.log(req.headers);
  return next();
}

module.exports = auth;
