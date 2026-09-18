import { prisma } from '../lib/prisma.js';

export class PostgresDeleteCustomerByIdRepository {
  async execute(customerId) {
    const customer = await prisma.customer.delete({
      where: customerId,
    });

    return customer;
  }
}
