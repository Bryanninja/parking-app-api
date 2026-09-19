import {
  CustomerAlredyExistError,
  CustomerNotFoundError,
} from '../errors/customer.js';

export class UpdateCustomerByIdUseCase {
  constructor(
    updateCustomerByIdRepository,
    getCustomerByIdRepository,
    getCustomerByPhoneRepository,
  ) {
    this.updateCustomerByIdRepository = updateCustomerByIdRepository;
    this.getCustomerByIdRepository = getCustomerByIdRepository;
    this.getCustomerByPhoneRepository = getCustomerByPhoneRepository;
  }
  async execute(customerId, updateCustomerParams) {
    const customer = await this.getCustomerByIdRepository.execute(customerId);

    if (!customer) throw new CustomerNotFoundError(customerId);

    if (updateCustomerParams.phone) {
      const customerWithPhone = await this.getCustomerByPhoneRepository.execute(
        updateCustomerParams.phone,
      );
      if (customerWithPhone && customerWithPhone.id !== customerId)
        throw new CustomerAlredyExistError();
    }

    const updatedCustomer = await this.updateCustomerByIdRepository.execute(
      customerId,
      updateCustomerParams,
    );

    return updatedCustomer;
  }
}
