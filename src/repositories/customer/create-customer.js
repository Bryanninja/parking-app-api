import { prisma } from '../../lib/prisma.js';

export class PostgresCreateCustomerRepository {
  async execute(customerParams) {
    const customer = await prisma.customer.create({
      data: customerParams,
    });
    return customer;
  }
}
