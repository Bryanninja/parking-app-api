import { ok, serverError } from '../../helpers/http.js';

export class GetTicketsController {
  constructor(getTicketsUseCase) {
    this.getTicketsUseCase = getTicketsUseCase;
  }
  async execute() {
    try {
      const tickets = await this.getTicketsUseCase.execute();
      return ok(tickets);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
