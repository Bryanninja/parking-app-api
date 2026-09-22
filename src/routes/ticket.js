import { Router } from 'express';
import {
  makeCreateTicketController,
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

export { ticketsRouter };
