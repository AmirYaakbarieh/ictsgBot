import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateBotRoutingModule } from './create-bot-routing.module';
import { CreateBotComponent } from './create-bot.component';



@NgModule({
  declarations: [
    CreateBotComponent,
  
  ],
  imports: [
    CommonModule,
    CreateBotRoutingModule
  ]
})
export class CreateBotModule { }
