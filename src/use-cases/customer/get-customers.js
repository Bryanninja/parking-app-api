export class GetCustomersUseCase {
  constructor(getCustomersRepository) {
    this.getCustomersRepository = getCustomersRepository;
  }
  async execute() {
    const customers = await this.getCustomersRepository.execute();
    return customers;
  }
}
