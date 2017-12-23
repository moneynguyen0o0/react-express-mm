import path from 'path';
import express, { Router } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import cors from 'cors';
import compress from 'compression';
import helmet from 'helmet';
import logger from 'morgan';
import favicon from 'serve-favicon';
import api from 'server/api';
import renderLayout from 'server/middleware/renderLayout';
import { notFound, logErrors, handleErrors } from 'server/middleware/errorHandler';
import { PORT, ENV } from 'config/env';
import { isProduction, isDevelopment } from 'config/app';
import { API } from 'server/constants/URL';

const app = express();

if (isDevelopment) {
  app.use(logger('dev'));
}

if (isProduction) {
  app.use(compress());
  // secure apps by setting various HTTP headers
  app.use(helmet());
}

app.use(favicon(path.join(__dirname, '..', 'app', 'images', 'favicon.ico')));
app.use('/assets', express.static(path.join(__dirname, '..', '..', 'public'), { maxAge: 86400000 }));

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(cookieParser());
app.use(methodOverride());

// mount all routes on /api path
app.use(API, api(Router()));

// render html
app.use(renderLayout());

// catch 404 and forward to error handler
app.use(notFound());

// error handler, send stacktrace only during development
app.use(logErrors());
app.use(handleErrors());

app.listen(PORT, () => {
  console.log('------------------------------------');
  console.log('===> 😎  Starting Server . . .');
  console.log(`===>  Environment: ${ENV}`);
  console.log(`===>  Listening on port: ${PORT}`);
  console.log('------------------------------------');
});
