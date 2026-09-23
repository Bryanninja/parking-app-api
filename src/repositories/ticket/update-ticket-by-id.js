import { prisma } from '../../lib/prisma.js';

export class PostgresUpdateTicketByIdRepository {
  async execute(ticketId, ticketParams) {
    const ticket = await prisma.update({
      where: {
        id: ticketId,
      },
      data: ticketParams,
    });
    return ticket;
  }
}
