import z from 'zod';
import {
  TicketAlreadyPaidError,
  TicketNotFoundError,
} from '../../errors/ticket.js';
import { badRequest, ok, serverError } from '../../helpers/http.js';
import {
  checkOutTicketParamsSchema,
  checkOutTicketSchema,
} from '../../schemas/ticket-schema.js';

export class CheckOutTicketController {
  constructor(checkOutTicketUseCase) {
    this.checkOutTicketUseCase = checkOutTicketUseCase;
  }

  async execute(httpRequest) {
    try {
      //validação com zod, params and body
      const { ticketId } = checkOutTicketParamsSchema.parse(httpRequest.params);
      const { payment_method } = checkOutTicketSchema.parse(httpRequest.body);

      // 2. Chama o UseCase
      const finalizedTicket = await this.checkOutTicketUseCase.execute(
        ticketId,
        payment_method,
      );

      return ok(finalizedTicket);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return badRequest({ message: error.issues[0].message });
      }
      if (error instanceof TicketNotFoundError) {
        return badRequest({ message: error.message });
      }

      if (error instanceof TicketAlreadyPaidError) {
        return badRequest({ message: error.message });
      }
      console.error(error);
      return serverError();
    }
  }
}
