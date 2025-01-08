export type Departure = {
  routeId: number;
  routeNumber: string;
  scheduledDepartureTime: string;
  realDepartureTime: string;
  endStop: string;
  delay: number;
}
