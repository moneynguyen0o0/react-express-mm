import { isDevelopment } from 'config/app';

export const notFound = () => (req, res, next) => {
  const err = new Error('Not found', 404);

  return next(err);
};

export const logErrors = () => (err, req, res, next) => {
  console.error(err.stack);

  next(err);
};

export const handleErrors = () => (err, req, res, next) => {
  const {
    status,
    message
  } = err;

  const error = {
    message: message || 'Internal Server Error'
  };

  if (isDevelopment) {
    error.error = err;
  }

  res.status(status || 500);
  res.json(error);
};
