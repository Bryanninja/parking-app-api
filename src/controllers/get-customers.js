import { ok, serverError } from '../helpers/http.js';

export class GetCustomersController {
  constructor(getCustomersUseCase) {
    this.getCustomersUseCase = getCustomersUseCase;
  }
  async execute() {
    try {
      const customers = await this.getCustomersUseCase.execute();
      return ok(customers);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
