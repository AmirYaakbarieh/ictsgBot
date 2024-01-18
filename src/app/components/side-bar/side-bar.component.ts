import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit{

  constructor(private appComponent: AppComponent,) {}
  
  ngOnInit(): void {
    this.appComponent.showHeader = true;
    this.appComponent.showSecondMenu = false
  }

  public sidebarShow: boolean = false;

}
