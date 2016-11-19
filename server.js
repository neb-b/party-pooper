import express from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import bodyParser from 'body-parser';
import Promise from 'bluebird';
import morgan from 'morgan';

import boomMiddleware from './middlewares/boomhandler';

// import teams from './routes/team';
// import users from './routes/user';
// import tourneys from './routes/tourney';

import UserModel from './models/user';

const app = express();

// Set bluebird promises as mongoose promise
mongoose.Promise = Promise;
const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/party-pooper';
mongoose.connect(mongoURL, (error) => {
  error ? throw error : console.error(`Connected to Mongodb instance at ${mongo}!`); // eslint-disable-line no-console
});

app.use(compression());
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/users', users);
app.use('/teams', teams);
app.use('/tourneys', tourneys);

// Boom badboy middleware
app.use(boomMiddleware);

app.listen(serverConfig.port, () => console.log('Runnign Server on 8080'));// eslint-disable-line no-console
