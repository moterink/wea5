import { DatePipe } from "@angular/common";
import { Component, input } from "@angular/core";
import { differenceInMinutes } from "date-fns";

@Component({
  selector: "app-datetime-with-delay",
  imports: [DatePipe],
  templateUrl: "./datetime-with-delay.component.html",
  styleUrl: "./datetime-with-delay.component.css",
})
export class DatetimeWithDelayComponent {
  scheduled = input.required<Date>();
  real = input<Date>();

  get delayInMinutes(): number {
    const real = this.real();
    const scheduled = this.scheduled();

    if (!real) {
      return 0;
    }

    return differenceInMinutes(real, scheduled);
  }
}
