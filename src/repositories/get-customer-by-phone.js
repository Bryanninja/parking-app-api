import { prisma } from '../lib/prisma.js';

export class PostgresGetCustomerByPhoneRepository {
  async execute(phone) {
    const customer = await prisma.customer.findUnique({
      where: { phone },
    });

    return customer;
  }
}
