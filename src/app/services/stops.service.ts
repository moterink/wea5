import { Injectable } from "@angular/core";
import { API_URL } from "../shared/constants";
import { Stop } from "../models/stop";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Departure } from "../models/departure";
import { of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class StopsService {
  private readonly endpoint = `${API_URL}/stops`;

  constructor(private readonly httpClient: HttpClient) {}

  getStops(search?: string) {
    let params = new HttpParams();
    if (search) {
      params = params.append("query", search);
    }

    return this.httpClient.get<Stop[]>(this.endpoint, { params });
  }

  getStop(id: number) {
    return this.httpClient.get<Stop>(`${this.endpoint}/${id}`);
  }

  getStopDepartures(id: number, startTime?: Date, limit = 5) {
    let params = new HttpParams();
    if (startTime) {
      params = params.append("startTime", startTime.toISOString());
    }
    params = params.append("limit", limit);

    return this.httpClient.get<Departure[]>(
      `${this.endpoint}/${id}/departures`,
      { params },
    );
  }

  createStop(stop: Stop) {
    return this.httpClient.post<Stop>(this.endpoint, stop);
  }
}
