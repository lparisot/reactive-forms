import { Component, OnInit, Input, OnChanges  } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators  } from '@angular/forms';
import { states, Address } from '../../../data-model';
import { ValidationComponent, CustomValidators} from '../../validation';

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
      other: new FormControl(address.other, [CustomValidators.integer(), CustomValidators.min(1)]) //CustomValidators.integer) //, ValidationComponent.min(10)
    })
  }
}
