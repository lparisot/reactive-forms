import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';


import { AppComponent } from './app.component';

import { CscLabelComponent } from './components/basics/csc-label/csc-label.component';
import { CscEnumComponent } from './components/basics/csc-enum/csc-enum.component';
import { CscInputComponent } from './components/basics/csc-input/csc-input.component';
import { AddressComponent } from './components/basics/address/address.component';

import { HeroDetailComponent } from './components/complex/hero-detail/hero-detail.component';
import { HeroesComponent } from './components/complex/heroes/heroes.component';
import { MessagesComponent } from './messages/messages.component';

import { HeroService } from './services/hero.service';
import { MessageService } from './services/message.service';
import { CscDateComponent } from './components/basics/csc-date/csc-date.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroDetailComponent,
    HeroesComponent,
    MessagesComponent,
    CscLabelComponent,
    CscEnumComponent,
    CscInputComponent,
    AddressComponent,
    CscDateComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    MyDatePickerModule
  ],
  providers: [
    HeroService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
