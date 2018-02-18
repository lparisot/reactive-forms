/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CscInputComponent } from './csc-input.component';

describe('CscInputComponent', () => {
  let component: CscInputComponent;
  let fixture: ComponentFixture<CscInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CscInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CscInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
