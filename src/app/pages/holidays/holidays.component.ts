import {ChangeDetectorRef, Component, inject, OnInit} from "@angular/core";
import {
  DateRange,
  DefaultMatCalendarRangeStrategy,
  MAT_DATE_RANGE_SELECTION_STRATEGY,
  MatCalendarCellClassFunction,
  MatDatepickerModule,
} from "@angular/material/datepicker";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from "@angular/material/dialog";
import { Holiday } from "../../models/holiday";
import { HolidayFormComponent } from "./components/holiday-form/holiday-form.component";
import {HolidaysService} from '../../services/holidays.service';
import {Observable, of} from 'rxjs';
import {DatePipe} from '@angular/common';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: "app-holidays",
  imports: [MatCardModule, MatDatepickerModule, MatIconModule, MatButtonModule, DatePipe, MatTableModule],
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: DefaultMatCalendarRangeStrategy,
    },
  ],
  templateUrl: "./holidays.component.html",
  styleUrl: "./holidays.component.css",
})
export class HolidaysComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  readonly holidayService = inject(HolidaysService);
  private cdr = inject(ChangeDetectorRef);

  holidays$: Observable<Holiday[]> = of();
  displayedColumns: string[] = ["name", "startDate", "endDate", "isSchoolHoliday"];
  holidays: Holiday[] = [];
  selectedDateRange: DateRange<Date> = new DateRange(new Date(), null);

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view === "month") {
      const isHoliday = this.holidays.some((holiday) =>
        this.isSameDate(new Date(holiday.startDate), cellDate)
      );

      console.log(isHoliday);

      return isHoliday ? "holiday-date" : "";
    }

    return "";
  };

  ngOnInit(): void {
    // Fetch holidays and store them in a local array
    this.holidays$ = this.holidayService.getHolidays();
    this.holidays$.subscribe((holidays) => {
      this.holidays = holidays;

      // Trigger change detection manually after holidays are updated
      this.cdr.detectChanges();
    });
  }

  _onSelectedChange(date: Date | null): void {
    if (
      date &&
      this.selectedDateRange &&
      this.selectedDateRange.start &&
      date > this.selectedDateRange.start &&
      !this.selectedDateRange.end
    ) {
      this.selectedDateRange = new DateRange(
        this.selectedDateRange.start,
        date,
      );
    } else {
      this.selectedDateRange = new DateRange(date, null);
    }
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateHolidayDialog, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed", result);
    });
  }

  private isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }
}

@Component({
  selector: "app-create-holiday-dialog",
  template: `
    <h2 mat-dialog-title>Create holiday</h2>
    <mat-dialog-content>
      <app-holiday-form></app-holiday-form>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onCloseClick()">Close</button>
      <button mat-button cdkFocusInitial [disabled]="">Submit</button>
    </mat-dialog-actions>
  `,
  imports: [
    HolidayFormComponent,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
  ],
})
class CreateHolidayDialog {
  readonly dialogRef = inject(MatDialogRef<CreateHolidayDialog>);
  readonly data = inject<Holiday>(MAT_DIALOG_DATA);

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
