import {
  CreateCustomerController,
  DeleteCustomerByIdController,
  GetCustomersController,
} from '../controllers/index.js';
import {
  PostgresCreateCustomerRepository,
  PostgresDeleteCustomerByIdRepository,
  PostgresGetCustomerByIdRepository,
  PostgresGetCustomerByPhoneRepository,
  PostgresGetCustomersRepository,
} from '../repositories/index.js';
import {
  CreateCustomerUseCase,
  DeleteCustomerByIdUseCase,
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

export const makeDeleteCustomerByIdController = () => {
  const getCustomerByIdRepository = new PostgresGetCustomerByIdRepository();
  const deleteCustomerByIdRepository =
    new PostgresDeleteCustomerByIdRepository();
  const deleteCustomerByIdUseCase = new DeleteCustomerByIdUseCase(
    deleteCustomerByIdRepository,
    getCustomerByIdRepository,
  );
  const deleteCustomerByIdController = new DeleteCustomerByIdController(
    deleteCustomerByIdUseCase,
  );
  return deleteCustomerByIdController;
};
