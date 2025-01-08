import { Routes } from "@angular/router";
import { StopsComponent } from "./pages/stops/stops.component";
import { HolidaysComponent } from "./pages/holidays/holidays.component";
import { RoutesComponent } from "./pages/routes/routes.component";
import { StatisticsComponent } from "./pages/statistics/statistics.component";

export const routes: Routes = [
  {
    path: "stops",
    component: StopsComponent,
  },
  {
    path: "routes",
    component: RoutesComponent,
  },
  {
    path: "holidays",
    component: HolidaysComponent,
  },
  {
    path: "statistics",
    component: StatisticsComponent,
  },
];
