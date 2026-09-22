export class GetTicketsUseCase {
  constructor(getTicketsRepository) {
    this.getTicketsRepository = getTicketsRepository;
  }
  async execute() {
    const tickets = await this.getTicketsRepository.execute();
    return tickets;
  }
}
