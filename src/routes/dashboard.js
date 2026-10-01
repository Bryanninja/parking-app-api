import { Router } from 'express';
import { makeGetDashboardMetricsController } from '../factories/dashboard.js';

const dashboardMetrics = Router();

dashboardMetrics.get('/', async (req, res) => {
  const getDashboardMetricsController = makeGetDashboardMetricsController();
  const { statusCode, body } = await getDashboardMetricsController.execute();
  res.status(statusCode).json(body);
});

export { dashboardMetrics };
