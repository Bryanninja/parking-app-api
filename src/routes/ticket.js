import { Router } from 'express';
import { makeCreateTicketController } from '../factories/tickets.js';

const ticketsRouter = Router();

ticketsRouter.post('/', async (req, res) => {
  const createTicketController = makeCreateTicketController();
  const { statusCode, body } = await createTicketController.execute(req);
  res.status(statusCode).json(body);
});

export { ticketsRouter };
