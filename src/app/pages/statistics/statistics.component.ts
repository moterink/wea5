import { Component, OnInit, signal, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StatisticsService } from "../../services/statistics.service";
import { RouteStatistic } from "../../models/statistic";
import { ChartData, ChartOptions } from "chart.js";
import { BaseChartDirective } from "ng2-charts";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatButtonModule } from "@angular/material/button";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: "app-statistics",
  standalone: true,
  imports: [
    CommonModule,
    BaseChartDirective,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  templateUrl: "./statistics.component.html",
  styleUrls: ["./statistics.component.css"],
})
export class StatisticsComponent implements OnInit {
  statistics = signal<RouteStatistic[]>([]);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  private statisticsService = inject(StatisticsService);
  private formBuilder = inject(FormBuilder);

  // Form für Zeitintervall
  dateForm = this.formBuilder.group({
    startDate: [new Date(new Date().setDate(new Date().getDate() - 7))], // Standard: Letzte Woche
    endDate: [new Date()],
  });

  // Daten für das Diagramm
  chartData = signal<ChartData<"bar">>({
    labels: [],
    datasets: [],
  });

  chartOptions: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    },
  };

  ngOnInit(): void {
    this.fetchStatistics();
  }

  fetchStatistics(): void {
    const { startDate, endDate } = this.dateForm.value;

    if (!startDate || !endDate) {
      this.error.set("Bitte wählen Sie ein gültiges Start- und Enddatum.");
      return;
    }

    const formattedStartDate = startDate.toISOString().split("T")[0];
    const formattedEndDate = endDate.toISOString().split("T")[0];

    this.isLoading.set(true);
    this.error.set(null);

    this.statisticsService.getPunctuality(startDate, endDate).subscribe({
      next: (data: RouteStatistic[]) => {
        this.statistics.set(data);
        this.updateChartData(data);
      },
      error: (err) => {
        console.error("Fehler beim Laden der Statistiken:", err);
        this.error.set("Daten konnten nicht geladen werden.");
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }

  updateChartData(data: RouteStatistic[]): void {
    const labels = data.map((stat) => `Route ${stat.routeNumber}`);
    const punctualData = data.map((stat) => stat.percentPunctual);
    const slightDelayData = data.map((stat) => stat.percentSlightlyDelayed);
    const delayData = data.map((stat) => stat.percentDelayed);
    const significantDelayData = data.map((stat) => stat.percentSignificantlyDelayed);

    this.chartData.set({
      labels,
      datasets: [
        { label: "Pünktlich (%)", data: punctualData, backgroundColor: "green" },
        { label: "Leicht verspätet (%)", data: slightDelayData, backgroundColor: "orange" },
        { label: "Verspätet (%)", data: delayData, backgroundColor: "red" },
        { label: "Deutlich verspätet (%)", data: significantDelayData, backgroundColor: "darkred" },
      ],
    });
  }
}
