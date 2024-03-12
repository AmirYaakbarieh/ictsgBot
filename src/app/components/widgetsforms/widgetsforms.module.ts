import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WidgetsformsRoutingModule } from './widgetsforms-routing.module';
import { WidgetsformsComponent } from './widgetsforms.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorPickerComponent } from '../color-picker/color-picker.component';
import { ColorPaletteComponent } from '../color-palette/color-palette.component';
import { ColorSliderComponent } from '../color-slider/color-slider.component';


@NgModule({
  declarations: [
    WidgetsformsComponent,
    ColorPickerComponent,
    ColorPaletteComponent,
    ColorSliderComponent
  ],
  imports: [
    CommonModule,
    WidgetsformsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class WidgetsformsModule { }
