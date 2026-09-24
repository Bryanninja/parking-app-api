import { TicketNotFoundError } from '../../errors/ticket.js';

export class DeleteTicketByIdUseCase {
  constructor(deleteTicketByIdRepository, getTicketByIdRepository) {
    this.deleteTicketByIdRepository = deleteTicketByIdRepository;
    this.getTicketByIdRepository = getTicketByIdRepository;
  }

  async execute(ticketId) {
    const ticket = await this.getTicketByIdRepository.execute(ticketId);

    if (!ticket) throw new TicketNotFoundError(ticketId);

    const deletedTicket =
      await this.deleteTicketByIdRepository.execute(ticketId);
    return deletedTicket;
  }
}
