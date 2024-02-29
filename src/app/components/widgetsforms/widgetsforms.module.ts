import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WidgetsformsRoutingModule } from './widgetsforms-routing.module';
import { WidgetsformsComponent } from './widgetsforms.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    WidgetsformsComponent
  ],
  imports: [
    CommonModule,
    WidgetsformsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class WidgetsformsModule { }
