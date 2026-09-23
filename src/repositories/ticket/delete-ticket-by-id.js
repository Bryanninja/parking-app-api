import { prisma } from '../../lib/prisma.js';

export class PostgresDeleteTicketByIdRepository {
  async execute(ticketId) {
    const ticket = await prisma.ticket.delete({
      where: {
        id: ticketId,
      },
    });

    return ticket;
  }
}
