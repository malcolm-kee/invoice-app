import { ErrorRequestHandler } from 'express';

export const defaultErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof Error && err.message) {
    return res.status(500).json({ message: err.message });
  }

  res.status(500);
  res.render('error', { error: err });
};
