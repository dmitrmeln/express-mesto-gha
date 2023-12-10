const { verifyWebToken } = require('../utils/jwt');
const UnauthorizedError = require('../errors/unauthorized-error');

// function auth(req, res, next) {
//   // const { cookie } = req.headers;
//   // const token = cookie.replace('jwt=', '');
//   // const token = req.headers.authorization.replace('Bearer ', '');
//   const token = req.headers.authorization;

//   let payload;
//   // console.log(payload)

//   try {
//     payload = verifyWebToken(token);

//     // if (!token || verifyWebToken(token) === false) {
//     //   return next(new UnauthorizedError('Запрещено.'));
//     // }
//   } catch (err) {
//     return next(new UnauthorizedError('Запрещено.'));
//   }

//   // if (!token || verifyWebToken(token) === false) {
//   //   return next(new UnauthorizedError('Запрещено.'));
//   // }
//   req.user = payload;
//   console.log(req.user)
//   next();
// }

function auth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Запрещено.'));
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = verifyWebToken(token);
  } catch (err) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  req.user = payload;
  return next();
}

module.exports = auth;
