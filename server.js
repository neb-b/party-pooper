import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import db from './db.init';
import boomMiddleware from './middlewares/boom.middleware';
import Routing from './routes';

const app = express();
const PORT = process.env.PORT || 3000;

// Mongo instance
db();

app.use(compression());
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));

//Routing
app.use('/api', Routing());

// Boom badboy middleware
app.use(boomMiddleware);

app.listen(PORT, () => console.log(`Running Server on ${PORT}`));// eslint-disable-line no-console
