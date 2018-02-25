import { Component, Input } from '@angular/core';
import { FormGroup, ValidatorFn, AbstractControl, FormControl, Validator } from '@angular/forms';

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

    this.validationMessages = this.buildMessages();
    console.log('onValueChanged:'+JSON.stringify(this.validationMessages));

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

  abstract buildErrors(): {};

  //abstract buildMessages(): {};

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
              console.log('name:'+name);
              let value = this.getGenericMessages()[name];
              message[name] = validators[name].attendue ? value + ' ' + validators[name].attendue + '.' : value + '.';
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

export function isEmptyInputValue(value) {
  // we don't check for string here so it also works with arrays
  console.log('function isEmptyInputValue:'+value);
  return value === null || value === undefined || value.length === 0;
}

export class CustomValidators implements Validator {

  validate(c: FormControl): {[key: string]: any} | null {
    return CustomValidators.integer(c);
  }

  static integer(control: FormControl): {[key: string]: any} | null {
    console.log('integer');
    return (control: AbstractControl): {[key: string]: any} | null => {
      console.log('control:'+control);
      if (isEmptyInputValue(control.value)) {
       return null;  // don't validate empty values to allow optional controls
      }
      const value = parseFloat(control.value);
      // Controls with NaN values after parsing should be treated as not having a
      // minimum, per the HTML forms spec: https://www.w3.org/TR/html5/forms.html#attr-input-min
      return !isNaN(value) ? {'integer': {'valid': false}} : null;
    }
  }
}

export function ageRangeValidator(control: AbstractControl): { [key: string]: boolean } | null {
  console.log('function ageRangeValidator');

  if (!control) {
    console.log('function ageRangeValidator1');
    return null;
  }

  if (isEmptyInputValue(control.value)) {
    console.log('function ageRangeValidator2');
    return null;
  }

  if (isNaN(control.value) || control.value < 18 || control.value > 45) {
    console.log('function ageRangeValidator3');
    return { 'ageRange': true };
  }

  console.log('function ageRangeValidator4');
  return null;
}

export class MyValidators {
  static ageRangeValidator(control: AbstractControl): { [key: string]: boolean } | null {
    console.log('age:'+control.value);

    if (isEmptyInputValue(control.value)) {
      return null;
    }
    if (isNaN(control.value) || control.value < 18 || control.value > 45) {
        return { 'ageRange': true };
    }

    return null;
  }

  static integer(control: AbstractControl): { [key: string]: boolean } | null {
    if (isEmptyInputValue(control.value)) {
      return null;
    }

    if (isNaN(control.value)) {
      return { 'integer':true };
    }

    return null;
  }
}
