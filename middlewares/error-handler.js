const mongoose = require('mongoose');

const errorsHandler = (err, req, res, next) => {
  console.log(err);
  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message });
  }
  if (err instanceof mongoose.Error.CastError || err instanceof mongoose.Error.ValidationError) {
    return res.status(400).send({ message: 'Переданы некорректные данные.' });
  }
  return res.status(500).send({ message: 'Ошибка сервера' });
};

module.exports = errorsHandler;
