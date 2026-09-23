import {
  CheckOutTicketController,
  CreateTicketController,
  GetTicketsController,
} from '../controllers/index.js';
import {
  PostgresCreateTicketRepository,
  PostgresGetCustomerByIdRepository,
  PostgresGetParkedTicketByLicensePlateRepository,
  PostgresGetTicketByIdRepository,
  PostgresGetTicketsRepository,
  PostgresUpdateTicketByIdRepository,
} from '../repositories/index.js';
import {
  CheckOutTicketUseCase,
  CreateTicketUseCase,
  GetTicketsUseCase,
} from '../use-cases/index.js';

export const makeCreateTicketController = () => {
  const getParkedTicketByLicensePlateRepository =
    new PostgresGetParkedTicketByLicensePlateRepository();
  const getCustomerByIdRepository = new PostgresGetCustomerByIdRepository();
  const createTicketRepository = new PostgresCreateTicketRepository();
  const createTicketUseCase = new CreateTicketUseCase(
    createTicketRepository,
    getCustomerByIdRepository,
    getParkedTicketByLicensePlateRepository,
  );
  const createTicketController = new CreateTicketController(
    createTicketUseCase,
  );
  return createTicketController;
};

export const makeGetTicketsController = () => {
  const getTicketsRepository = new PostgresGetTicketsRepository();
  const getTicketsUseCase = new GetTicketsUseCase(getTicketsRepository);
  const getTicketsController = new GetTicketsController(getTicketsUseCase);
  return getTicketsController;
};

export const makeCheckOutTicketController = () => {
  const getTicketByIdRepository = new PostgresGetTicketByIdRepository();
  const updateTicketByIdRepository = new PostgresUpdateTicketByIdRepository();
  const checkOutTicketUseCase = new CheckOutTicketUseCase(
    updateTicketByIdRepository,
    getTicketByIdRepository,
  );
  const ckeckOutTicketController = new CheckOutTicketController(
    checkOutTicketUseCase,
  );
  return ckeckOutTicketController;
};
