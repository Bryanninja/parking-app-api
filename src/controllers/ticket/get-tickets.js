import z from 'zod';
import { badRequest, ok, serverError } from '../../helpers/http.js';
import { getTicketsQuerySchema } from '../../schemas/ticket-schema.js';

export class GetTicketsController {
  constructor(getTicketsUseCase) {
    this.getTicketsUseCase = getTicketsUseCase;
  }
  async execute(httpRequest) {
    try {
      const queryParams = getTicketsQuerySchema.parse(httpRequest.query);

      const tickets = await this.getTicketsUseCase.execute(queryParams);
      return ok(tickets);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return badRequest({ message: error.issues[0].message });
      }
      console.error(error);
      return serverError();
    }
  }
}
