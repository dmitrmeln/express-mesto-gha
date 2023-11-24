const express = require('express');

const app = express();
const mongoose = require('mongoose');

const appRouter = require('./routes');

mongoose.connect('mongodb://localhost:27017/mestodb')
  .then(() => {
    console.log('mongodb connected');
  });

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '65605bc44ae34efff041aed5',
  };

  next();
});

app.use(appRouter);

app.listen(3000, () => {
  console.log('server started on port 3000');
});
