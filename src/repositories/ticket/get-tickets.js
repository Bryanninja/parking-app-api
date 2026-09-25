import { prisma } from '../../lib/prisma.js';

export class PostgresGetTicketsRepository {
  async execute(options = {}) {
    const { skip = 0, take = 10 } = options;

    const tickets = await prisma.ticket.findMany({
      skip,
      take,
      orderBy: { created_at: 'desc' },
      include: { customer: true },
    });
    return tickets;
  }
}
