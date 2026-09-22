import { prisma } from '../../lib/prisma.js';

export class PostgresGetTicketsRepository {
  async execute() {
    const tickets = await prisma.ticket.findMany();
    return tickets;
  }
}
