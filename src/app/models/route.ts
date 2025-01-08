export type RouteStop = {
  routeId: number;
  stopId: number;
  sequenceNumber: number;
  scheduledDepartureTime: Date;
};

export type Route = {
  id: number;
  number: string;
  validFrom: Date;
  validTo: Date;
  daysOfOperation: string;
  stops: RouteStop[];
};
