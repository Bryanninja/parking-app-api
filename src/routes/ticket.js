import { Router } from 'express';
import {
  makeCheckOutTicketController,
  makeCreateTicketController,
  makeDeleteTicketByIdController,
  makeGetTicketsController,
} from '../factories/tickets.js';

const ticketsRouter = Router();

ticketsRouter.post('/', async (req, res) => {
  const createTicketController = makeCreateTicketController();
  const { statusCode, body } = await createTicketController.execute(req);
  res.status(statusCode).json(body);
});

ticketsRouter.get('/', async (req, res) => {
  const getTicketsController = makeGetTicketsController();
  const { statusCode, body } = await getTicketsController.execute();
  res.status(statusCode).json(body);
});

ticketsRouter.patch('/:ticketId/checkout', async (req, res) => {
  const checkOutTicketController = makeCheckOutTicketController();
  const { statusCode, body } = await checkOutTicketController.execute(req);
  res.status(statusCode).json(body);
});

ticketsRouter.delete('/:ticketId', async (req, res) => {
  const deleteTicketByIdController = makeDeleteTicketByIdController();
  const { statusCode, body } = await deleteTicketByIdController.execute(req);
  res.status(statusCode).json(body);
});

export { ticketsRouter };
