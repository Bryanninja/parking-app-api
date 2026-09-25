import { ok, serverError } from '../../helpers/http.js';

export class GetTicketsController {
  constructor(getTicketsUseCase) {
    this.getTicketsUseCase = getTicketsUseCase;
  }
  async execute(httpRequest) {
    try {
      const queryParams = httpRequest?.query || {};

      const tickets = await this.getTicketsUseCase.execute(queryParams);
      return ok(tickets);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
