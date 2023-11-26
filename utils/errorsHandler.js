const mongoose = require('mongoose');

const {
  dataError,
  serverError,
} = require('./constants');

function handleErrors(err, res, specificError) {
  if (err instanceof mongoose.Error.CastError || err instanceof mongoose.Error.ValidationError) {
    return res.status(dataError.status).send({ message: dataError.message });
  }
  if (err.message === specificError.message) {
    return res.status(specificError.status).send({ message: specificError.message });
  }
  return res.status(serverError.status).send({ message: serverError.message });
}

module.exports = handleErrors;
