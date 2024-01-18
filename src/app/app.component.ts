import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ictsgPro new';

  constructor(private titleService: Title, private router: Router){
    this.titleService.setTitle($localize`${this.title}`)
  }

 
  showHeader: boolean = true;
  showFooter: boolean = true;
  showdashboard: boolean = false;
  showSecondMenu: boolean = false;
  showThirdMenu: boolean = false


  ngOnInit(): void {
    // this.showFooter = true;
    // this.showHeader = true;
    // this.showdashboard = false;
    // this.showSecondMenu = false;
    // this.showThirdMenu = false;
  }




  }
