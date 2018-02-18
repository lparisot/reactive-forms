/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CscEnumComponent } from './csc-enum.component';

describe('CscEnumComponent', () => {
  let component: CscEnumComponent;
  let fixture: ComponentFixture<CscEnumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CscEnumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CscEnumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
