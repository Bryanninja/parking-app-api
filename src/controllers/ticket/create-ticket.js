import z from 'zod';
import { VehicleAlreadyParkedError } from '../../errors/ticket.js';
import { badRequest, created, serverError } from '../../helpers/http.js';
import { createTicketSchema } from '../../schemas/ticket.js';
import { CustomerNotFoundError } from '../../errors/customer.js';

export class CreateTicketController {
  constructor(createTicketUseCase) {
    this.createTicketUseCase = createTicketUseCase;
  }

  async execute(httpRequest) {
    try {
      const validatedBody = createTicketSchema.parse(httpRequest.body);

      const ticket = await this.createTicketUseCase.execute(validatedBody);
      return created(ticket);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return badRequest({ message: error.issues[0].message });
      }
      if (error instanceof VehicleAlreadyParkedError) {
        return badRequest({ message: error.message });
      }
      if (error instanceof CustomerNotFoundError) {
        return badRequest({ message: error.message });
      }

      console.error(error);
      return serverError();
    }
  }
}
