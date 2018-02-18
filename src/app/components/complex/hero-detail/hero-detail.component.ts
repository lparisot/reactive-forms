import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IMyDpOptions } from 'mydatepicker';

import { Address, Hero } from '../../../data-model';
import { HeroService } from '../../../services/hero.service';
import { AddressComponent } from '../../basics/address/address.component';
import { ValidationComponent } from '../../validation';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['../../error.css', './hero-detail.component.css']
})
export class HeroDetailComponent extends ValidationComponent implements OnInit, OnChanges  {
  @Input() hero: Hero;
  myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
  };

  constructor(private fb: FormBuilder,
              private heroService: HeroService) {
    super();
  }

  // override ValidationComponent
  buildErrors(): {} {
    return {
      'name': '',
      'date': ''
    }
  }

  // override ValidationComponent
  buildMessages(): {} {
    return {
      'name': {
        'required':      'Name is required.',
        'minlength':     'Name must be at least 2 characters long.'
      },
      'date': {
        'required':      'Date is required.',
      }
    }
  }

  // implements OnInit
  ngOnInit() {
    this.setFormGroup(this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)] ],
      date: ['', Validators.required],
      secretLairs: this.fb.array([])
    }));
    // onchanges happened before oninit
    this.ngOnChanges();
  }

  // implements OnChanges
  ngOnChanges() {
    if(this.formGroup) {
      // You should reset the form when the hero changes so that control values from the previous hero are cleared and status flags are restored to the pristine state.
      this.formGroup.reset({
        name: this.hero.name,
        date: ''
      });
      this.setAddresses(this.hero.addresses);
    }
  }

  onSubmit() {
    this.hero = this.prepareSaveHero();
    this.heroService.updateHero(this.hero).subscribe(/* error handling */);
    this.ngOnChanges();
  }

  prepareSaveHero(): Hero {
    const formModel = this.formGroup.value;

    // deep copy of form model lairs
    const secretLairsDeepCopy: Address[] = formModel.secretLairs.map(
      (address: Address) => Object.assign({}, address)
    );

    // return new `Hero` object containing a combination of original hero value(s)
    // and deep copies of changed form model values
    const saveHero: Hero = {
      id: this.hero.id,
      name: formModel.name as string,
      // addresses: formModel.secretLairs // <-- bad!
      addresses: secretLairsDeepCopy
    };
    return saveHero;
  }

  revert() { this.ngOnChanges(); }

  get secretLairs(): FormArray {
    return this.formGroup.get('secretLairs') as FormArray;
  }

  setAddresses(addresses: Address[]) {
    const addressFGs = addresses.map(address => AddressComponent.buildFormGroup(address));
    const addressFormArray = this.fb.array(addressFGs);
    this.formGroup.setControl('secretLairs', addressFormArray);
  }

  addLair() {
    this.secretLairs.push(AddressComponent.buildFormGroup(new Address()));
  }
}
