import { CustomerNotFoundError } from '../errors/customer.js';

export class UpdateCustomerByIdUseCase {
  constructor(updateCustomerByIdRepository, getCustomerByIdRepository) {
    this.updateCustomerByIdRepository = updateCustomerByIdRepository;
    this.getCustomerByIdRepository = getCustomerByIdRepository;
  }
  async execute(customerId, updateCustomerParams) {
    const customer = await this.getCustomerByIdRepository.execute(customerId);

    if (!customer) throw new CustomerNotFoundError(customerId);

    const updatedCustomer = await this.updateCustomerByIdRepository.execute(
      customerId,
      updateCustomerParams,
    );

    return updatedCustomer;
  }
}
