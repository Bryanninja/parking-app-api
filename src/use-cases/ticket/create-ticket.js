import { CustomerNotFoundError } from '../../errors/customer.js';
import { VehicleAlreadyParkedError } from '../../errors/ticket.js';

export class CreateTicketUseCase {
  constructor(
    createTicketRepository,
    getCustomerByIdRepository,
    getParkedTicketByLicensePlateRepository,
  ) {
    this.createTicketRepository = createTicketRepository;
    this.getCustomerByIdRepository = getCustomerByIdRepository;
    this.getParkedTicketByLicensePlateRepository =
      getParkedTicketByLicensePlateRepository;
  }
  async execute(ticketParams) {
    const customerId = ticketParams.customer_id;
    const licensePlate = ticketParams.license_plate;

    const customerExist =
      await this.getCustomerByIdRepository.execute(customerId);

    if (!customerExist) throw new CustomerNotFoundError(customerId);

    const vehicleAlreadyParked =
      await this.getParkedTicketByLicensePlateRepository.execute(licensePlate);
    if (vehicleAlreadyParked) throw new VehicleAlreadyParkedError(licensePlate);

    const ticket = await this.createTicketRepository.execute(ticketParams);
    return ticket;
  }
}
