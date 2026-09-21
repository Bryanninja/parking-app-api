import { CreateTicketController } from '../controllers/index.js';
import {
  PostgresCreateTicketRepository,
  PostgresGetCustomerByIdRepository,
} from '../repositories/index.js';
import { PostgresGetParkedTicketByLicensePlateRepository } from '../repositories/ticket/get-parked-ticket-by-license-plate.js';
import { CreateTicketUseCase } from '../use-cases/index.js';

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
