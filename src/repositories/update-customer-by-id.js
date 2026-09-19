import { prisma } from '../lib/prisma.js';

export class PostgresUpdateCustomerByIdRepository {
  async execute(customerId, updateCustomerParams) {
    const customer = await prisma.customer.update({
      where: {
        id: customerId,
      },

      data: updateCustomerParams,
    });

    return customer;
  }
}
