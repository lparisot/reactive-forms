/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CscDateComponent } from './csc-date.component';

describe('CscDateComponent', () => {
  let component: CscDateComponent;
  let fixture: ComponentFixture<CscDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CscDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CscDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
