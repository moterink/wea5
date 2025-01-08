import { Injectable } from "@angular/core";
import { API_URL } from "../shared/constants";
import { HttpClient, HttpParams } from "@angular/common/http";
import { RouteStatistic } from "../models/statistic";

@Injectable({
  providedIn: "root",
})
export class StatisticsService {
  private readonly endpoint = `${API_URL}/statistics`;

  constructor(private readonly httpClient: HttpClient) {}

  getPunctuality(
    startDate: Date = new Date(2024, 1, 1),
    endDate: Date = new Date(2025, 1, 1),
  ) {
    const params = new HttpParams()
      .append("startDate", startDate.toISOString())
      .append("endDate", endDate.toISOString());

    return this.httpClient.get<RouteStatistic[]>(
      `${this.endpoint}/punctuality`,
      { params },
    );
  }
}
