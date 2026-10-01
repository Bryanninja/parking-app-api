import { GetDashboardMetricsController } from '../controllers/index.js';
import { PostgresGetDashboardMetricsRepository } from '../repositories/index.js';
import { GetDashboardMetricsUseCase } from '../use-cases/dashboard/get-dashboard-metrics.js';

export const makeGetDashboardMetricsController = () => {
  const getDashboardMetricsRepository =
    new PostgresGetDashboardMetricsRepository();
  const getDashboardMetricsUseCase = new GetDashboardMetricsUseCase(
    getDashboardMetricsRepository,
  );
  const getDashboardMetricsController = new GetDashboardMetricsController(
    getDashboardMetricsUseCase,
  );
  return getDashboardMetricsController;
};
