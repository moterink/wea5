import { Component } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { RouteSearchComponent } from "./components/route-search/route-search.component";

@Component({
  selector: "app-routes",
  imports: [RouteSearchComponent],
  templateUrl: "./routes.component.html",
  styleUrl: "./routes.component.css",
})
export class RoutesComponent {}
