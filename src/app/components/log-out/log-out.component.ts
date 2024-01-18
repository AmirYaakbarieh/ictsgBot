import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css']
})
export class LogOutComponent implements OnInit {
  
  
  reactiveForm: FormGroup

  constructor(private authService: AuthService, private router: Router,) { }

  ngOnInit() {
    
  }

  signOut() {
    this.authService.logout();
    this.router.navigateByUrl('');
  }

}
