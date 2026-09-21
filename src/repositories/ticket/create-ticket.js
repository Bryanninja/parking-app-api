import { prisma } from '../../lib/prisma.js';

export class PostgresCreateTicketRepository {
  async execute(ticketParams) {
    const ticket = await prisma.ticket.create({
      data: ticketParams,
    });

    return ticket;
  }
}
