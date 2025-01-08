import { Component, forwardRef, input, OnDestroy } from "@angular/core";
import { MatSelectModule } from "@angular/material/select";
import { Stop } from "../../../../models/stop";
import {
  ControlContainer,
  ControlValueAccessor,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import { MatFormFieldControl } from "@angular/material/form-field";

@Component({
  selector: "app-stop-select",
  imports: [MatSelectModule],
  templateUrl: "./stop-select.component.html",
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StopSelectComponent),
      multi: true,
    },
  ],
  styleUrl: "./stop-select.component.css",
})
export class StopSelectComponent {
  stops = input.required<Stop[]>();
  formControlName = input<string>("");
}
