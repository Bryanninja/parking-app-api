import { CustomerNotFoundError } from '../errors/customer.js';

export class DeleteCustomerByIdUseCase {
  constructor(deleteCustomerByIdRepository, getCustomerByIdRepository) {
    this.deleteCustomerByIdRepository = deleteCustomerByIdRepository;
    this.getCustomerByIdRepository = getCustomerByIdRepository;
  }
  async execute(customerId) {
    //verifica se o usario existe
    const customerWasNotFound =
      await this.getCustomerByIdRepository.execute(customerId);
    if (customerWasNotFound) throw new CustomerNotFoundError(customerId);

    const deletedCustomer =
      await this.deleteCustomerByIdRepository.execute(customerId);
    return deletedCustomer;
  }
}
