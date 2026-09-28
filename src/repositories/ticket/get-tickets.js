import { prisma } from '../../lib/prisma.js';

export class PostgresGetTicketsRepository {
  async execute(options = {}) {
    const { skip = 0, take = 10, startDate, endDate } = options;

    // 1. Monta o filtro apenas se as datas forem informadas
    const where = {};

    if (startDate && endDate) {
      where.created_at = {
        gte: startDate, // Maior ou igual a 00:00:00
        lte: endDate, // Menor ou igual a 23:59:59
      };
    }

    // 2. Faz a busca no Prisma
    const tickets = await prisma.ticket.findMany({
      where, // Aplica o filtro de data (se estiver vazio, traz todos como antes!)
      skip,
      take,
      orderBy: {
        created_at: 'desc',
      },
      include: {
        customer: true,
      },
    });

    return tickets;
  }
}
