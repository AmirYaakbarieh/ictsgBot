import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { ManagementComponent } from './management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FrameComponent } from '../frame/frame.component';




@NgModule({
  declarations: [
    ManagementComponent,
    // UsermenuComponent
    FrameComponent
    
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // SharedModule
    
  ]
})
export class ManagementModule { }
