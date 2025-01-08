import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCheckboxModule } from "@angular/material/checkbox";

@Component({
  selector: "app-holiday-form",
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: "./holiday-form.component.html",
  styleUrl: "./holiday-form.component.css",
})
export class HolidayFormComponent {
  formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    name: ["", Validators.required],
    startDate: ["", Validators.required],
    endDate: ["", Validators.required],
    isSchoolHoliday: [false, Validators.required],
  });
}
