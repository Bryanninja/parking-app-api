import { prisma } from '../../lib/prisma.js';

export class PostgresUpdateTicketByIdRepository {
  async execute(ticketParams) {
    const ticket = await prisma.update({
      data: ticketParams,
    });
    return ticket;
  }
}
