import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Holiday } from "../models/holiday";
import { API_URL } from "../shared/constants";

@Injectable({
  providedIn: "root",
})
export class HolidaysService {
  private readonly endpoint = `${API_URL}/holidays`;

  constructor(private readonly httpClient: HttpClient) {}

  getHolidays() {
    return this.httpClient.get<Holiday[]>(this.endpoint);
  }

  addHoliday(holiday: Holiday) {
    return this.httpClient.post<number>(`${this.endpoint}`, holiday);
  }

  modifyHoliday(id: number, holiday: Holiday) {
    this.httpClient.put(`${this.endpoint}/${id}`, holiday);
  }

  deleteHoliday(id: number) {
    this.httpClient.delete(`${this.endpoint}/${id}`);
  }
}
