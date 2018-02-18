import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-csc-enum',
  templateUrl: './csc-enum.component.html',
  styleUrls: ['../../error.css', './csc-enum.component.css']
})
export class CscEnumComponent {
  @Input() data = { label: '', values: '' };
  @Input() control: FormControl;
  @Input() formError: string;

  constructor() { }
}
