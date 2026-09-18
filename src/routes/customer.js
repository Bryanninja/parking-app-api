import { Router } from 'express';
import { makeCreateCustomerController } from '../factories/customer.js';

const customersRouter = Router();

customersRouter.post('/', async (request, response) => {
  const createCustomerController = makeCreateCustomerController();

  const { statusCode, body } = await createCustomerController.execute(request);

  return response.status(statusCode).json(body);
});

export { customersRouter };
