export class GetDashboardMetricsUseCase {
  constructor(getDashboardMetricsRepository) {
    this.getDashboardMetricsRepository = getDashboardMetricsRepository;
  }

  async execute() {
    // 1. Calcula as datas de HOJE (00:00:00 até 23:59:59)
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    // 2. Calcula as datas de ONTEM (00:00:00 até 23:59:59)
    const yesterdayStart = new Date();
    yesterdayStart.setDate(yesterdayStart.getDate() - 1);
    yesterdayStart.setHours(0, 0, 0, 0);

    const yesterdayEnd = new Date();
    yesterdayEnd.setDate(yesterdayEnd.getDate() - 1);
    yesterdayEnd.setHours(23, 59, 59, 999);

    // 3. Busca os dados no repositório
    const { todayTickets, yesterdayTicketsCount, yesterdayRevenue } =
      await this.getDashboardMetricsRepository.execute({
        todayStart,
        todayEnd,
        yesterdayStart,
        yesterdayEnd,
      });

    // 4. Métricas de Clientes
    const todayCustomersCount = todayTickets.length;
    const customersDiff = todayCustomersCount - yesterdayTicketsCount;

    // 5. Métricas de Receita (soma apenas os tickets pagos de hoje)
    const todayRevenue = todayTickets
      .filter((ticket) => ticket.status === 'PAID')
      .reduce((acc, ticket) => acc + Number(ticket.total_amount), 0);

    const revenueDiff = todayRevenue - yesterdayRevenue;

    // 6. Porcentagem de crescimento em relação a ontem
    let growthPercentage;
    if (yesterdayRevenue === 0) {
      growthPercentage = todayRevenue > 0 ? 100 : 0;
    } else {
      growthPercentage = Math.round(
        ((todayRevenue - yesterdayRevenue) / yesterdayRevenue) * 100,
      );
    }

    // 7. Gráfico de Entradas por Horários (as 6 faixas do Figma!)
    const timeRanges = [
      { time_range: '06:00 / 09:00', start: 6, end: 9 },
      { time_range: '09:00 / 12:00', start: 9, end: 12 },
      { time_range: '12:00 / 15:00', start: 12, end: 15 },
      { time_range: '15:00 / 18:00', start: 15, end: 18 },
      { time_range: '18:00 / 21:00', start: 18, end: 21 },
      { time_range: '21:00 / 00:00', start: 21, end: 24 },
    ];

    const entriesByHour = timeRanges.map((range) => {
      const count = todayTickets.filter((ticket) => {
        const ticketHour = new Date(ticket.created_at).getHours();
        return ticketHour >= range.start && ticketHour < range.end;
      }).length;

      return {
        time_range: range.time_range,
        count,
      };
    });

    // 8. Retorna o objeto pronto para o Frontend
    return {
      customers: {
        today: todayCustomersCount,
        yesterday: yesterdayTicketsCount,
        diff: customersDiff,
      },
      revenue: {
        today: todayRevenue,
        yesterday: yesterdayRevenue,
        diff: revenueDiff,
      },
      growth_percentage: growthPercentage,
      entries_by_hour: entriesByHour,
    };
  }
}
