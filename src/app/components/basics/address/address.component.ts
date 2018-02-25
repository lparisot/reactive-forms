import { Component, OnInit, Input, OnChanges  } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators  } from '@angular/forms';
import { states, Address } from '../../../data-model';
import { ValidationComponent, CustomValidators, MyValidators, ageRangeValidator } from '../../validation';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['../../error.css', './address.component.css']
})
export class AddressComponent extends ValidationComponent implements OnInit {
  @Input('group') addressForm: FormGroup;

  states = states;

  constructor() {
    super();
  }

  // implements OnInit
  ngOnInit() {
    this.setFormGroup(this.addressForm);
  }

  static buildFormGroup(address: Address) {
    console.log('address:'+JSON.stringify(address));
    return new FormGroup({
      street: new FormControl(address.street),
      city: new FormControl(address.city, Validators.required),
      state: new FormControl(address.state, Validators.required),
      zip: new FormControl(address.zip, [Validators.required, Validators.pattern('[0-9]{5}')]),
      other: new FormControl(address.other, [ValidationComponent.integer(), ValidationComponent.min(1)]) //CustomValidators.integer) //, ValidationComponent.min(10)
    })
  }

  // override ValidationComponent
  buildErrors(): {} {
    return {
      'street': '',
      'city': '',
      'state': '',
      'zip': '',
      'other': ''
    }
  }

  // override ValidationComponent
  /*
  buildMessages(): {} {
    return {
      'street': {
        'required':      'Street is required.'
      },
      'city': {
        'required':      'City is required.'
      },
      'state': {
        'required':      'State is required.'
      },
      'zip': {
        'required':      'Zip is required.',
        'pattern':       'Zip must be an integer of 5 characters'
      },
      'other': {
        'integer':       'must be an integer',
        'min':           'Other must be greater than 9',
        'email':         'email'
      }
    }
  }
  */
}
