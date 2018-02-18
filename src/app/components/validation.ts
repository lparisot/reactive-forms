import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-validation'
})
export abstract class ValidationComponent {
  formGroup: FormGroup;
  formErrors = {};
  validationMessages = {};

  constructor() {
    this.formErrors = this.buildErrors();
    this.validationMessages = this.buildMessages();
  }

  setFormGroup(formGroup: FormGroup) {
    this.formGroup = formGroup;
    this.formGroup
      .valueChanges
      .subscribe(data => this.onValueChanged(data));
  }

  protected onValueChanged(data?: any) {
    if (!this.formGroup) { return; }

    const form = this.formGroup;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  abstract buildErrors(): {};

  abstract buildMessages(): {};
}
