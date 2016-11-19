import express from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import bodyParser from 'body-parser';
import Promise from 'bluebird';
import morgan from 'morgan';

import boomMiddleware from './middlewares/boom.middleware';

const app = express();
const PORT = process.env.PORT || 3000;
const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/party-pooper';

// Set bluebird promises as mongoose promise
mongoose.Promise = Promise;
mongoose.connect(mongoURL, error => {
  if(error) {
    console.error(`RUN  Mongodb !`);
    throw error;
  }
  console.error(`Connected to Mongodb instance at ${mongoURL}!`)
});

app.use(compression());
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));

// Boom badboy middleware
app.use(boomMiddleware);

app.listen(PORT, () => console.log('Runnign Server on 8080'));// eslint-disable-line no-console
