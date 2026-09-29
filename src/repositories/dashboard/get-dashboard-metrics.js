import { prisma } from '../../lib/prisma.js';

export class PostgresGetDashboardRepository {
  async execute({ todayStart, todayEnd, yesterdayStart, yesterdayEnd }) {
    const [todayTickets, yesterdayTicketsCount, yesterdayRevenueResult] =
      await Promise.all([
        // 1. Busca os tickets de hoje (com total_price e status para somarmos no UseCase!)
        prisma.ticket.findMany({
          where: {
            created_at: {
              gte: todayStart,
              lte: todayEnd,
            },
          },
          select: {
            id: true,
            created_at: true,
            total_price: true,
            status: true,
          },
        }),

        // 2. Conta quantos tickets foram gerados ontem
        prisma.ticket.count({
          where: {
            created_at: {
              gte: yesterdayStart,
              lte: yesterdayEnd,
            },
          },
        }),

        // 3. Soma o faturamento dos tickets que foram pagos ontem
        prisma.ticket.aggregate({
          where: {
            created_at: {
              gte: yesterdayStart,
              lte: yesterdayEnd,
            },
            status: 'PAID',
          },
          _sum: {
            total_price: true,
          },
        }),
      ]);

    return {
      todayTickets,
      yesterdayTicketsCount,
      yesterdayRevenue: Number(yesterdayRevenueResult._sum?.total_price) || 0,
    };
  }
}
