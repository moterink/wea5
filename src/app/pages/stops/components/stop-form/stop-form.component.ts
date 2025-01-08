import { Component, inject, Output, EventEmitter } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-stop-form",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: "./stop-form.component.html",
  styleUrls: ["./stop-form.component.css"],
})
export class StopFormComponent {
  @Output() submitForm = new EventEmitter<any>();

  private formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    name: ["", Validators.required],
    shortName: ["", Validators.required],
    location: ["", Validators.required],
  });

  onSubmit(): void {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
      this.form.reset();
    }
  }
}
