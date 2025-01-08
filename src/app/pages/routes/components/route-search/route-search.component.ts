import { Component, inject, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { StopSelectComponent } from "../../../stops/components/stop-select/stop-select.component";
import { StopsService } from "../../../../services/stops.service";
import { Observable, of } from "rxjs";
import { Stop } from "../../../../models/stop";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { CommonModule } from "@angular/common";
import { MatSelectModule } from "@angular/material/select";
import { RoutesService } from "../../../../services/routes.service";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatTimepickerModule } from "@angular/material/timepicker";
import { Timetable } from "../../../../models/timetable";
import { MatTableModule } from "@angular/material/table";
import { DatetimeWithDelayComponent } from "../../../../shared/datetime-with-delay/datetime-with-delay.component";
import { StopDisplayNamePipe } from "../../../../pipes/stop-display-name.pipe";

@Component({
  selector: "app-route-search",
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatInputModule,
    MatTimepickerModule,
    MatDatepickerModule,
    MatTableModule,
    DatetimeWithDelayComponent,
    StopDisplayNamePipe,
    CommonModule,
  ],
  templateUrl: "./route-search.component.html",
  styleUrl: "./route-search.component.css",
})
export class RouteSearchComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private stopsService = inject(StopsService);
  private routesService = inject(RoutesService);

  stops$: Observable<Stop[]> = of();
  timetable$: Observable<Timetable> = of();

  form = this.formBuilder.group({
    startStop: ["", Validators.required],
    endStop: ["", Validators.required],
    date: [new Date().toISOString(), Validators.required],
    time: [new Date().toISOString(), Validators.required],
    isArrivalTime: [false, Validators.required],
  });

  displayedColumns = [
    "routeId",
    "startStopId",
    "endStopId",
    "departure",
    "arrival",
  ];

  ngOnInit(): void {
    this.stops$ = this.stopsService.getStops();
    this.form.valueChanges.subscribe(() => {
      const startStopId = this.form.controls["startStop"].value;
      const endStopId = this.form.controls["endStop"].value;
      const date = new Date(this.form.controls["date"].value!);
      console.log(date, this.form.controls["date"].value);
      if (this.isSelectionValid) {
        this.timetable$ = this.routesService.getTimetable(
          parseInt(startStopId!),
          parseInt(endStopId!),
          date,
          false,
        );
        this.timetable$.subscribe((s) => console.log(s));
      }
    });
  }

  get isSelectionValid() {
    return this.form.valid;
  }
}
