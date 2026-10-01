import { ok, serverError } from '../../helpers/http.js';

export class GetDashboardMetricsController {
  constructor(getDashboardMetricsUseCase) {
    this.getDashboardMetricsUseCase = getDashboardMetricsUseCase;
  }
  async execute() {
    try {
      const metrics = await this.getDashboardMetricsUseCase.execute();
      return ok(metrics);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
