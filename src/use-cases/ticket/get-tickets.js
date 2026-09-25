export class GetTicketsUseCase {
  constructor(getTicketsRepository) {
    this.getTicketsRepository = getTicketsRepository;
  }

  async execute(queryParams = {}) {
    // 1. Converte e define valores padrão
    const page = Number(queryParams.page) || 1;
    const limit = Number(queryParams.limit) || 10;

    // 2. A fórmula mágica do skip (quantos pular)
    const skip = (page - 1) * limit;

    // 3. Chama o repositório passando o skip e take
    const tickets = await this.getTicketsRepository.execute({
      skip,
      take: limit,
    });

    return tickets;
  }
}
