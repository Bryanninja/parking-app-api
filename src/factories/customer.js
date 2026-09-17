import { CreateCustomerController } from '../controllers/index.js';
import { PostgresCreateCustomerRepository } from '../repositories/index.js';
import { PostgresGetCustomerByPhoneRepository } from '../repositories/index.js';
import { CreateCustomerUseCase } from '../use-cases/index.js';

export const makeCreateCustomerController = () => {
  const getCustomerByPhone = new PostgresGetCustomerByPhoneRepository();
  const createCustomerRepository = new PostgresCreateCustomerRepository();
  const createCustomerUseCase = new CreateCustomerUseCase(
    createCustomerRepository,
    getCustomerByPhone,
  );
  const createCustomerController = new CreateCustomerController(
    createCustomerUseCase,
  );
  return createCustomerController;
};
