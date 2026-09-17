import { CustomerAlredyExistError } from '../errors/customer.js';

export class CreateCustomerUseCase {
  constructor(createCustomerRepository, getCustomerByPhoneRepository) {
    this.createCustomerRepository = createCustomerRepository;
    this.getCustomerByPhoneRepository = getCustomerByPhoneRepository;
  }
  async execute(customerParams) {
    const customerPhone = customerParams.phone;

    if (customerPhone) {
      const customerAlredyExist =
        await this.getCustomerByPhoneRepository.execute(customerPhone);

      if (customerAlredyExist) throw new CustomerAlredyExistError();
    }

    const customer =
      await this.createCustomerRepository.execute(customerParams);
    return customer;
  }
}
