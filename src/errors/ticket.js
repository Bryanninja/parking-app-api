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
