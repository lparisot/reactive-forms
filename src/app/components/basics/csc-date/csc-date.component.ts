import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IMyDpOptions } from 'mydatepicker';

@Component({
  selector: 'app-csc-date',
  templateUrl: './csc-date.component.html',
  styleUrls: ['./csc-date.component.css']
})
export class CscDateComponent {
  @Input() data = { label: '', options: {} };
  @Input() control: FormControl;
  @Input() formError: string;

  constructor() { }

}
