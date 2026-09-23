export class VehicleAlreadyParkedError extends Error {
  constructor(licensePlate) {
    super(`Vehicle with license plates ${licensePlate} is alredy parked.`);
    this.name = 'VehicleAlreadyParkedError';
  }
}

export class TicketNotFoundError extends Error {
  constructor(ticketId) {
    super(`Ticket with id: ${ticketId} not found.`);
    this.name = 'TicketNotFoundError';
  }
}

export class TicketAlreadyPaidError extends Error {
  constructor(ticketId) {
    super(`Ticket with id: ${ticketId} Alredy Paid.`);
    this.name = 'TicketAlreadyPaidError';
  }
}

export class PaymentMethodRequiredError extends Error {
  constructor(message = 'A payment method is required for paid tickets.') {
    super(message);
    this.name = 'PaymentMethodRequiredError';
  }
}
