const dataError = {
  status: 400,
  message: 'Переданы некорректные данные.',
};

const userNotFoundError = {
  status: 404,
  message: 'Пользователь с указанным _id не найден.',
};

const cardNotFoundError = {
  status: 404,
  message: 'Карточка с указанным _id не найдена.',
};

const serverError = {
  status: 500,
  message: 'Ошибка сервера.',
};

module.exports = {
  dataError,
  userNotFoundError,
  cardNotFoundError,
  serverError,
};
