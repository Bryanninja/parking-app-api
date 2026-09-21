import { prisma } from '../../lib/prisma.js';

export class PostgresGetCustomersRepository {
  async execute() {
    const customers = await prisma.customer.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });
    return customers;
  }
}
