import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {

  onDisableToken: boolean = true;
  
  constructor(private router: Router){}

  backToHome() {
    this.router.navigate(['/home'])
  }


  // public sidebarShow: boolean = false;

  


}
