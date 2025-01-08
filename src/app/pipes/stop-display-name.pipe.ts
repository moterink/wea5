import { inject, Pipe, PipeTransform } from "@angular/core";
import { Stop } from "../models/stop";

@Pipe({
  name: "stopDisplayName",
})
export class StopDisplayNamePipe implements PipeTransform {
  transform(stopId: number, stops: Stop[] | null): string | undefined {
    if (!stops) {
      return;
    }
    return stops.find((stop) => stop.id === stopId)?.name;
  }
}
