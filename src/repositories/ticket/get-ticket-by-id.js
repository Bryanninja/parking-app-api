import { prisma } from '../../lib/prisma.js';

export class PostgresGetTicketByIdRepository {
  async execute(ticketId) {
    const ticket = await prisma.ticket.findUnique({
      where: {
        id: ticketId,
      },
    });
    return ticket;
  }
}
