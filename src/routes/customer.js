import { Router } from 'express';
import {
  makeCreateCustomerController,
  makeDeleteCustomerByIdController,
  makeGetCustomersController,
} from '../factories/customer.js';
import { app } from '../app.js';

const customersRouter = Router();

customersRouter.post('/', async (req, res) => {
  const createCustomerController = makeCreateCustomerController();
  const { statusCode, body } = await createCustomerController.execute(req);
  return res.status(statusCode).json(body);
});

customersRouter.get('/', async (req, res) => {
  const getCustomersController = makeGetCustomersController();
  const { statusCode, body } = await getCustomersController.execute();
  res.status(statusCode).json(body);
});

customersRouter.delete('/:customerId', async (req, res) => {
  const deleteCustomerByIdController = makeDeleteCustomerByIdController();
  const { statusCode, body } = await deleteCustomerByIdController.execute(req);
  res.status(statusCode).json(body);
});

export { customersRouter };
