import {Component, OnInit, OnChanges, SimpleChanges, input, signal, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { StopsService } from '../../../../services/stops.service';
import { Stop } from '../../../../models/stop';
import { Departure } from '../../../../models/departure';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-arrivals',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './arrivals.component.html',
  styleUrls: ['./arrivals.component.css']
})
export class ArrivalsComponent implements OnInit, OnChanges {
  // Define a required signal-based input
  stop = input.required<Stop>();

  // Reactive signals for component state
  departures = signal<Departure[]>([]);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  private stopsService = inject(StopsService);

  displayedColumns: string[] = ['routeNumber', 'scheduledDepartureTime', 'realDepartureTime', 'endStop', 'delay'];

  ngOnInit(): void {
    this.fetchDepartures();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['stop'] && !changes['stop'].firstChange) {
      this.fetchDepartures();
    }
  }

  fetchDepartures(): void {
    this.isLoading.set(true);
    this.error.set(null);
    this.departures.set([]);

    this.stopsService.getStopDepartures(this.stop().id)
      .subscribe({
        next: (data: Departure[]) => {
          this.departures.set(data);
        },
        error: (err) => {
          console.error('Error fetching departures:', err);
          this.error.set('Failed to load departures. Please try again later.');
        },
        complete: () => {
          this.isLoading.set(false);
        }
      });
  }
}
