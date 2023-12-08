require('dotenv').config();

const express = require('express');

const app = express();
const mongoose = require('mongoose');

const appRouter = require('./routes');

const { PORT, MONGO_URL } = require('./utils/config');

mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('mongodb connected');
  });

app.use(express.json());

app.use(appRouter);

app.listen(3000, () => {
  console.log(`server started on port ${PORT}`);
});
