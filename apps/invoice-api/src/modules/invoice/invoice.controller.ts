import { InvoiceStatus } from '@prisma/client';
import { Router } from 'express';
import * as invoiceService from './invoice.service';
import { invoiceSchema } from './invoice.validator';

export const invoiceController: Router = Router();

export interface GetInvoicesQueryParams {
  status?: InvoiceStatus;
}

invoiceController.get('/', (req, res, next) => {
  const { status } = req.query;

  return invoiceService
    .getInvoices(
      status &&
        (status === InvoiceStatus.DRAFT ||
          status === InvoiceStatus.PAID ||
          status === InvoiceStatus.PENDING)
        ? {
            status: {
              equals: status,
            },
          }
        : undefined
    )
    .then((invoices) => res.json(invoices))
    .catch(next);
});

invoiceController.get('/:id', (req, res, next) => {
  return invoiceService
    .getOneInvoice(req.params.id)
    .then((invoice) => {
      if (invoice) {
        return res.json(invoice);
      }

      return res.status(404).json({
        message: 'Invoice not found',
      });
    })
    .catch(next);
});

export type CreateInvoiceBody = invoiceService.CreateInvoiceInput;

invoiceController.post('/', (req, res, next) => {
  const body = req.body as CreateInvoiceBody;

  if (body.status === 'PENDING') {
    const validateResult = invoiceSchema.safeParse(body);

    if (!validateResult.success) {
      return res.status(401).json(validateResult.error.issues);
    }
  }

  invoiceService
    .createInvoice(body)
    .then((result) => res.json(result))
    .catch(next);
});

export type UpdateInvoiceBody = invoiceService.UpdateInvoiceInput;

invoiceController.put('/:id', (req, res, next) => {
  const body = req.body as UpdateInvoiceBody;

  if (body.status === 'PENDING') {
    const validateResult = invoiceSchema.safeParse(body);

    if (!validateResult.success) {
      return res.status(401).json(validateResult.error.issues);
    }
  }

  invoiceService
    .updateInvoice(req.params.id, body)
    .then((result) => res.json(result))
    .catch(next);
});

invoiceController.delete('/:id', (req, res, next) => {
  invoiceService
    .deleteInvoice(req.params.id)
    .then((result) => res.json(result))
    .catch(next);
});
