import { prisma } from '../lib/prisma.js';

export class PostgresGetCustomerByIdRepository {
  async execute(customerId) {
    const customer = await prisma.customer.findUnique({
      where: customerId,
    });
    return customer;
  }
}
