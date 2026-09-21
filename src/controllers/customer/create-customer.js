import z from 'zod';
import { CustomerAlredyExistError } from '../../errors/customer.js';
import { badRequest, created, serverError } from '../../helpers/http.js';
import { createCustomerSchema } from '../../schemas/customer-schema.js';

export class CreateCustomerController {
  constructor(createCustomerUseCase) {
    this.createCustomerUseCase = createCustomerUseCase;
  }

  async execute(httpRequest) {
    try {
      // validar recebimento dos dados

      const validateBody = createCustomerSchema.parse(httpRequest.body);

      const customer = await this.createCustomerUseCase.execute(validateBody);

      return created(customer);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return badRequest({ message: error.issues[0].message });
      }
      if (error instanceof CustomerAlredyExistError) {
        return badRequest({ message: error.message });
      }
      console.error(error);
      return serverError();
    }
  }
}
