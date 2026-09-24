import z from 'zod';
import {
  CustomerAlredyExistError,
  CustomerNotFoundError,
} from '../../errors/customer.js';
import { badRequest, ok, serverError } from '../../helpers/http.js';
import {
  updateCustomerSchema,
  customerIdParamSchema,
} from '../../schemas/customer-schema.js';

export class UpdateCustomerByIdController {
  constructor(updateCustomerByIdUseCase) {
    this.updateCustomerByIdUseCase = updateCustomerByIdUseCase;
  }

  async execute(httpRequest) {
    try {
      // 1. Valida o ID que veio na URL
      const { customerId } = customerIdParamSchema.parse(httpRequest.params);

      // 2. Valida o body que veio no JSON
      const updateCustomerParams = updateCustomerSchema.parse(httpRequest.body);

      // 3. Passa os DOIS parâmetros para o UseCase (QUEM e O QUE)
      const updatedCustomer = await this.updateCustomerByIdUseCase.execute(
        customerId,
        updateCustomerParams,
      );

      return ok(updatedCustomer);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return badRequest({ message: error.issues[0].message });
      }
      if (error instanceof CustomerNotFoundError) {
        return badRequest({ message: error.message });
      }

      if (error instanceof CustomerAlredyExistError) {
        return badRequest({ message: error.message });
      }
      console.error(error);
      return serverError();
    }
  }
}
