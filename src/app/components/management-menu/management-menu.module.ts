import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementMenuRoutingModule } from './management-menu-routing.module';
import { ManagementMenuComponent } from './management-menu.component';


@NgModule({
  declarations: [
    // ManagementMenuComponent
  ],
  imports: [
    CommonModule,
    ManagementMenuRoutingModule
  ]
})
export class ManagementMenuModule { }
