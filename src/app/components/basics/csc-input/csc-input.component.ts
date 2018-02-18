import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-csc-input',
  templateUrl: './csc-input.component.html',
  styleUrls: ['../../error.css', './csc-input.component.css']
})
export class CscInputComponent {
  @Input() data = { label: '' };
  @Input() control: FormControl;
  @Input() formError: string;

  constructor() { }
}
