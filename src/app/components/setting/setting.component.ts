import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  showPhotoInForm: boolean = true

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    // this.authService.doNotShowPhoto()
  }


  photo(){
    // this.authService.doNotShowPhoto();
    this.showPhotoInForm = !this.showPhotoInForm
  }

  

}
