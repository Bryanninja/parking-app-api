import { CustomerNotFoundError } from '../../errors/customer.js';

export class DeleteCustomerByIdUseCase {
  constructor(deleteCustomerByIdRepository, getCustomerByIdRepository) {
    this.deleteCustomerByIdRepository = deleteCustomerByIdRepository;
    this.getCustomerByIdRepository = getCustomerByIdRepository;
  }
  async execute(customerId) {
    const customer = await this.getCustomerByIdRepository.execute(customerId);

    if (!customer) {
      throw new CustomerNotFoundError(customerId);
    }
    const deletedCustomer =
      await this.deleteCustomerByIdRepository.execute(customerId);
    return deletedCustomer;
  }
}
