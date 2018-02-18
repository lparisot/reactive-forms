import { Component, OnInit, Input  } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators  } from '@angular/forms';
import { states, Address } from '../../../data-model';
import { ValidationComponent } from '../../validation';

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
    return new FormGroup({
      street: new FormControl(address.street, Validators.required),
      city: new FormControl(address.city, Validators.required),
      state: new FormControl(address.state, Validators.required),
      zip: new FormControl(address.zip, [Validators.required, Validators.pattern('[0-9]{5}')]),
      other: new FormControl(address.other)
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
      }
    }
  }
}
