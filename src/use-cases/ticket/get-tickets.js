export class GetTicketsUseCase {
  constructor(getTicketsRepository) {
    this.getTicketsRepository = getTicketsRepository;
  }

  async execute(queryParams = {}) {
    // 1. Converte e define valores padrão
    const { page = 1, limit = 10 } = queryParams;
    const skip = (page - 1) * limit; // 2. A fórmula mágica do skip (quantos pular)

    let startDate;
    let endDate;

    if (queryParams.period) {
      startDate = new Date();
      endDate = new Date();

      switch (queryParams.period) {
        case 'today': {
          startDate.setHours(0, 0, 0, 0);

          endDate.setHours(23, 59, 59, 999);
          break;
        }

        case 'yesterday': {
          startDate.setDate(startDate.getDate() - 1);
          startDate.setHours(0, 0, 0, 0);

          endDate.setDate(endDate.getDate() - 1);
          endDate.setHours(23, 59, 59, 999);
          break;
        }

        case 'last_7_days': {
          startDate.setDate(startDate.getDate() - 7);
          startDate.setHours(0, 0, 0, 0);

          endDate.setHours(23, 59, 59, 999);
          break;
        }

        case 'last_14_days': {
          startDate.setDate(startDate.getDate() - 14);
          startDate.setHours(0, 0, 0, 0);

          endDate.setHours(23, 59, 59, 999);
          break;
        }

        case 'this_month': {
          startDate.setDate(1);
          startDate.setHours(0, 0, 0, 0);

          endDate.setHours(23, 59, 59, 999);
          break;
        }

        case 'this_year': {
          startDate.setMonth(0, 1); // Vai para 01 de Janeiro do ano atual!
          startDate.setHours(0, 0, 0, 0); // 00:00:00
          endDate.setHours(23, 59, 59, 999); // Até o fim do dia de hoje
          break;
        }

        default: {
          // Se passar um período desconhecido (ex: ?period=banana), ignoramos o filtro
          startDate = undefined;
          endDate = undefined;
          break;
        }
      }
    }

    const tickets = await this.getTicketsRepository.execute({
      skip,
      take: limit,
      startDate,
      endDate,
    });

    return tickets;
  }
}
