import {
  CreateTicketController,
  GetTicketsController,
} from '../controllers/index.js';
import {
  PostgresCreateTicketRepository,
  PostgresGetCustomerByIdRepository,
  PostgresGetParkedTicketByLicensePlateRepository,
  PostgresGetTicketsRepository,
} from '../repositories/index.js';
import { CreateTicketUseCase, GetTicketsUseCase } from '../use-cases/index.js';

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
