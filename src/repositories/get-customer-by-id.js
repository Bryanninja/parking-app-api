import { prisma } from '../lib/prisma.js';

export class PostgresGetCustomerByIdRepository {
  async execute(customerId) {
    const customer = await prisma.customer.findUnique({
      where: {
        id: customerId,
      },
    });
    return customer;
  }
}
