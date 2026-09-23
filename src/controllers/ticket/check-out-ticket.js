import z from 'zod';
import {
  TicketAlreadyPaidError,
  TicketNotFoundError,
} from '../../errors/ticket.js';
import { badRequest, ok, serverError } from '../../helpers/http.js';
import {
  checkOutTicketParamsSchema,
  checkOutTicketSchema,
} from '../../schemas/ticket.js';

export class CheckOutTicketController {
  constructor(checkOutTicketUseCase) {
    this.checkOutTicketUseCase = checkOutTicketUseCase;
  }

  async execute(httpRequest) {
    try {
      const { ticketId } = httpRequest.params;
      const paymentMethod = httpRequest.body.payment_method;

      //validação com zod, params and body
      const validTicketId = checkOutTicketParamsSchema.parse(ticketId);
      const validPaymentMethod = checkOutTicketSchema.parse(paymentMethod);

      const finalizedTicket = await this.checkOutTicketUseCase.execute(
        validTicketId,
        validPaymentMethod,
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
