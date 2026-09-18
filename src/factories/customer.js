import {
  CreateCustomerController,
  GetCustomersController,
} from '../controllers/index.js';
import {
  PostgresCreateCustomerRepository,
  PostgresGetCustomerByPhoneRepository,
  PostgresGetCustomersRepository,
} from '../repositories/index.js';
import {
  CreateCustomerUseCase,
  GetCustomersUseCase,
} from '../use-cases/index.js';

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

export const makeGetCustomersController = () => {
  const getCustomersRepository = new PostgresGetCustomersRepository();
  const getCustomersUseCase = new GetCustomersUseCase(getCustomersRepository);
  const getCustomersController = new GetCustomersController(
    getCustomersUseCase,
  );
  return getCustomersController;
};
