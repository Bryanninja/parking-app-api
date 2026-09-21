import { prisma } from '../../lib/prisma.js';

export class PostgresGetParkedTicketByLicensePlateRepository {
  async execute(licensePlate) {
    const ticket = await prisma.ticket.findFirst({
      where: {
        license_plate: licensePlate,
        status: 'PARKED',
      },
    });
    return ticket;
  }
}
