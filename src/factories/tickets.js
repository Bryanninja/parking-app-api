import {
  CheckOutTicketController,
  CreateTicketController,
  DeleteTicketByIdController,
  GetTicketsController,
} from '../controllers/index.js';
import {
  PostgresCreateTicketRepository,
  PostgresDeleteTicketByIdRepository,
  PostgresGetCustomerByIdRepository,
  PostgresGetParkedTicketByLicensePlateRepository,
  PostgresGetTicketByIdRepository,
  PostgresGetTicketsRepository,
  PostgresUpdateTicketByIdRepository,
} from '../repositories/index.js';
import {
  CheckOutTicketUseCase,
  CreateTicketUseCase,
  DeleteTicketByIdUseCase,
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

export const makeDeleteTicketByIdController = () => {
  const getTicketByIdRepository = new PostgresGetTicketByIdRepository();
  const deleteTicketByIdRepository = new PostgresDeleteTicketByIdRepository();
  const deleteTicketByIdUseCase = new DeleteTicketByIdUseCase(
    deleteTicketByIdRepository,
    getTicketByIdRepository,
  );
  const deleteTicketByIdController = new DeleteTicketByIdController(
    deleteTicketByIdUseCase,
  );
  return deleteTicketByIdController;
};
