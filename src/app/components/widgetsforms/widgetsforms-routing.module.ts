import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WidgetsformsComponent } from './widgetsforms.component';

const routes: Routes = [{ path: '', component: WidgetsformsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WidgetsformsRoutingModule { }
