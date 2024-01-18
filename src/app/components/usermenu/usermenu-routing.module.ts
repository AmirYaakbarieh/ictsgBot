import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsermenuComponent } from './usermenu.component';

const routes: Routes = [{ path: '', component: UsermenuComponent }];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsermenuRoutingModule { }
