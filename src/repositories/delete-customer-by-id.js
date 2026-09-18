import { prisma } from '../lib/prisma.js';

export class PostgresDeleteCustomerById {
  async execute(customerId) {
    const customer = await prisma.customer.delete({
      where: customerId,
    });

    return customer;
  }
}
