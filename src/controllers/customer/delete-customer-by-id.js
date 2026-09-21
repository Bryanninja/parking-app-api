import z from 'zod';
import { CustomerNotFoundError } from '../../errors/customer.js';
import { badRequest, ok, serverError } from '../../helpers/http.js';
import { deleteCustomerParamsSchema } from '../../schemas/customer-schema.js';

export class DeleteCustomerByIdController {
  constructor(deleteCustomerByIdUseCase) {
    this.deleteCustomerByIdUseCase = deleteCustomerByIdUseCase;
  }

  async execute(httpRequest) {
    try {
      const { customerId } = deleteCustomerParamsSchema.parse(
        httpRequest.params,
      );

      const deletedCustomer =
        await this.deleteCustomerByIdUseCase.execute(customerId);

      return ok(deletedCustomer);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return badRequest({ message: error.issues[0].message });
      }
      if (error instanceof CustomerNotFoundError) {
        return badRequest({ message: error.message });
      }
      console.error(error);
      return serverError();
    }
  }
}
