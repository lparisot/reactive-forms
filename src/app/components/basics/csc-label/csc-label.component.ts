import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-csc-label',
  templateUrl: './csc-label.component.html',
  styleUrls: ['./csc-label.component.css']
})
export class CscLabelComponent {
  @Input() data = { label: '', required: false };

  constructor() { }
}
