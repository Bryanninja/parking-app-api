import z from 'zod';
import { TicketNotFoundError } from '../../errors/ticket.js';
import { badRequest, ok, serverError } from '../../helpers/http.js';
import { ticketIdParamSchema } from '../../schemas/ticket-schema.js';

export class DeleteTicketByIdController {
  constructor(deleteTicketByIdUseCase) {
    this.deleteTicketByIdUseCase = deleteTicketByIdUseCase;
  }
  async execute(httpRequest) {
    try {
      const { ticketId } = ticketIdParamSchema.parse(httpRequest.params);

      const deletedTicket =
        await this.deleteTicketByIdUseCase.execute(ticketId);
      return ok(deletedTicket);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return badRequest({ message: error.issues[0].message });
      }

      if (error instanceof TicketNotFoundError) {
        return badRequest({ message: error.message });
      }
      console.error(error);
      return serverError();
    }
  }
}
