import { Component, Input } from '@angular/core';
import { FormGroup, ValidatorFn, AbstractControl, FormControl, Validator } from '@angular/forms';

@Component({
  selector: 'app-validation'
})
export abstract class ValidationComponent {
  formGroup: FormGroup;
  formErrors = {};
  validationMessages = {};

  constructor() {}

  setFormGroup(formGroup: FormGroup) {
    this.formGroup = formGroup;
    this.formGroup
      .valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.formErrors = this.buildErrors();
    this.validationMessages = this.buildMessages();
  }

  protected onValueChanged(data?: any) {
    if (!this.formGroup) { return; }

    this.validationMessages = this.buildMessages();

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

  buildErrors() {
    let errors = {};
    if (this.formGroup) {
      Object.keys(this.formGroup.controls).forEach(key => {
        errors[key] = '';
      });
    }
    return errors;
  }

  getGenericMessages() {
    return {
      'required': 'Champs requis',
      'min': 'La valeur doit être >= à',
      'max': 'La valeur doit être <= à',
      'maxlength': 'Longueur maximum',
      'minlength': 'Longueur minimum',
      'integer': 'Entrez un entier',
      'email': 'Entrez un email valide',
      'pattern': 'Invalide'
    }
  }
  buildMessages() {
    let messages = {};
    if (this.formGroup) {
      Object.keys(this.formGroup.controls).forEach(key => {
        if (this.formGroup.controls[key].validator) {
          let validators = this.formGroup.controls[key].validator(this.formGroup.controls[key]);
          if (validators) {
            let message = {};
            Object.keys(validators).forEach(name => {
              let value = this.getGenericMessages()[name];
              let field = null;
              switch(name) {
                case 'min':
                case 'max':
                  field = 'attendue';
                  break;
                case 'maxlength':
                case 'minlength':
                  field = 'requiredLength';
                  break;
                case 'pattern':
                  field = 'requiredPattern';
              }
              if (field) {
                message[name] = value + ' ' + validators[name][field];
              }
              else {
                message[name] = value;
              }
              message[name] += '.';
            });
            messages[key] = message;
          }
          else {
            messages[key] = {};
          }
        }
      });
    }
    return messages;
  }
}

export class CustomValidators {
  protected static isEmptyInputValue(value: any): boolean {
    // we don't check for string here so it also works with arrays
    return (value == null) || (typeof value == 'undefined') || (value.length === 0);
  }

  static min(min: number): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      var num = +control.value;
      if(isNaN(num) || num < min){
        return {
           min: {courante: control.value, attendue: min}
        };
      }
      return null;
    };
  }

  static max(max: number): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      var num = +control.value;
      if(isNaN(num) || num > max){
        return {
           max: {courante: control.value, attendue: max}
        };
      }
      return null;
    };
  }

  static integer(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      var num = +control.value;
      if(isNaN(num)){
        return {
           integer: {courante: control.value}
        };
      }
      return null;
    };
  }

  static email(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      let EMAIL_REGEXP = /^$|^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
      if (!EMAIL_REGEXP.test(control.value)) {
        return {
          email: true
        }
      }
      return null;
    }
  }
}
