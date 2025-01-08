import { Component, OnInit, signal, computed, inject } from "@angular/core";
import { StopsService } from "../../services/stops.service";
import { Stop } from "../../models/stop";
import { CommonModule } from "@angular/common";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ArrivalsComponent } from './components/arrivals/arrivals.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {StopFormComponent} from './components/stop-form/stop-form.component';

@Component({
  selector: "app-stops",
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ArrivalsComponent,
  ],
  templateUrl: "./stops.component.html",
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  styleUrl: "./stops.component.css",
})
export class StopsComponent implements OnInit {
  stops = signal<Stop[]>([]);

  filterText = signal<string>('');

  filteredStops = computed(() => {
    const filter = this.filterText().toLowerCase();
    if (!filter) {
      return this.stops();
    }
    return this.stops().filter(stop =>
      stop.name.toLowerCase().includes(filter) ||
      stop.shortName.toLowerCase().includes(filter)
    );
  });

  columnsToDisplay = ["name"];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, "expand"];

  expandedStop = signal<Stop | null>(null);

  private stopsService = inject(StopsService);

  private dialog = inject(MatDialog);

  ngOnInit() {
    this.fetchStops();
  }

  // Fetch stops from the service and set the stops signal
  fetchStops(): void {
    this.stopsService.getStops().subscribe({
      next: (data: Stop[]) => {
        this.stops.set(data);
      },
      error: (err) => {
        console.error('Error fetching stops:', err);
        // Optionally, handle the error state here
      }
    });
  }

  // Update the filterText signal based on user input
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterText.set(filterValue.trim().toLowerCase());
  }

  // Toggle the expanded stop
  toggleRow(stop: Stop): void {
    this.expandedStop.set(this.expandedStop()?.id === stop.id ? null : stop);
  }

  openCreateStopDialog(): void {
    const dialogRef = this.dialog.open(CreateStopDialogComponent, {
      width: '400px',
      data: {}, // Pass any initial data if necessary
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the newly created stop data
        this.createStop(result);
      }
    });
  }

  // Method to handle creating a new stop
  createStop(stopData: any): void {
    this.stopsService.createStop(stopData).subscribe({
      next: (newStop: Stop) => {
        // Add the new stop to the stops signal
        this.stops.update(stops => [...stops, newStop]);
      },
      error: (err) => {
        console.error('Error creating stop:', err);
      }
    });
  }
}

@Component({
  selector: "app-create-stop-dialog",
  standalone: true,
  imports: [
    MatDialogModule,
    StopFormComponent,
    MatButtonModule,
  ],
  template: `
    <h2 mat-dialog-title>Create New Stop</h2>
    <mat-dialog-content>
      <app-stop-form (submitForm)="onSubmit($event)"></app-stop-form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onClose()">Cancel</button>
      <!-- The Submit button is handled inside the form -->
    </mat-dialog-actions>
  `,
})
export class CreateStopDialogComponent {
  private dialogRef = inject(MatDialogRef<CreateStopDialogComponent>);
  // If you need to pass data, inject MAT_DIALOG_DATA
  // private data = inject(MAT_DIALOG_DATA);

  onSubmit(stopData: any): void {
    // You can pass the data back to the parent component
    this.dialogRef.close(stopData);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
