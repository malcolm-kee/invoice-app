import cors from 'cors';
import express from 'express';
import { defaultErrorHandler } from './lib/error-handler';
import { invoiceController } from './modules/invoice';

export const createApp = (): express.Express => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use('/invoice', invoiceController);

  app.all('*', (_, res) =>
    res.status(404).json({
      message: 'Not found',
    })
  );

  app.use(defaultErrorHandler);

  return app;
};
