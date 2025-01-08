import { Injectable } from "@angular/core";
import { API_URL } from "../shared/constants";
import { Route } from "../models/route";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Timetable } from "../models/timetable";

@Injectable({
  providedIn: "root",
})
export class RoutesService {
  private readonly endpoint = `${API_URL}/routes`;

  constructor(private readonly httpClient: HttpClient) {}

  getRoutes() {
    return this.httpClient.get<Route[]>(this.endpoint);
  }

  getTimetable(
    startStopId: number,
    endStopId: number,
    dateTime: Date,
    isArrivalTime: boolean,
    limit = 3,
  ) {
    const params = new HttpParams()
      .append("startStopId", startStopId)
      .append("endStopId", endStopId)
      .append("dateTime", dateTime.toISOString())
      .append("isArrivalTime", isArrivalTime)
      .append("limit", limit);

    return this.httpClient.get<Timetable>(`${this.endpoint}/timetable`, {
      params,
    });
  }

  addRoute(route: Route) {}

  modifyRoute(id: number, route: Route) {}

  deleteRoute(id: number) {
    this.httpClient.delete(`${this.endpoint}/${id}`);
  }
}
