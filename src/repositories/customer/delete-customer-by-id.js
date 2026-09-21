import { prisma } from '../../lib/prisma.js';

export class PostgresDeleteCustomerByIdRepository {
  async execute(customerId) {
    const customer = await prisma.customer.delete({
      where: {
        id: customerId,
      },
    });

    return customer;
  }
}
