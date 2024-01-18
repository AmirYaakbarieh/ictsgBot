import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AuthTestParams, BotData, IUserId } from 'src/models/chatbot-node.models';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  
  reactiveForm: FormGroup ;

  selectedFile: File | null = null;

  userName: string;



  constructor(private authService: AuthService, private http: HttpClient, private router: Router,){}


  
  ngOnInit(): void {

    this.reactiveForm = new FormGroup({
      personalDetails: new FormGroup({
        botName: new FormControl(null, [Validators.required, this.nameFormatValidator()]),
        typeBot: new FormControl(null, [Validators.required]), 
        description: new FormControl(null, [Validators.required]), 
      })
    });

   
    
  }

  // profileImageUrl: string = './assets/images/83.jpg'; 
  profileImageUrl: string | ArrayBuffer | null = './assets/images/83.jpg'; 

  // onFileSelected(event: Event): void {
  //   const inputElement = event.target as HTMLInputElement;
  //   const file = inputElement?.files?.[0];

  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
  //       this.profileImageUrl = e.target.result;
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }


  onFileSelected(input: HTMLInputElement): void {
    const file = input?.files?.[0];

    if (file) {
      // Log file details
      console.log('File Name:', file.name);
      console.log('File Size:', file.size, 'bytes');
      console.log('File Type:', file.type);
      console.log('File Type:', file);

      const reader = new FileReader();
      reader.onload = () => {
        this.profileImageUrl = reader.result;
        // this.selectedPhoto = reader.result;
      };
      reader.readAsDataURL(file);
      
    }
  }
  
  onSubmit(){
    const botName = this.reactiveForm.get('personalDetails.botName')?.value;
    console.log(botName)
    const typeBot = this.reactiveForm.get('personalDetails.typeBot')?.value;
    console.log(typeBot)
    const userId = this.authService.userId;
    console.log(userId);


    const data: BotData = {
      botName: botName,
      botFile: "",
      status: true,
      template: true,
      userId: userId
    };

   

    // this.authService.sendRequest('POST', 'http://192.168.100.217:5000', '/api/bots/create', data)
    //   .then((response) => {
    //     console.log('Bot data saved:', response);
    //     this.router.navigate(['/management']);
    //   })
    //   .catch((error) => {
    //     console.error('Error saving bot data:', error);
    //   });
    const params: AuthTestParams = {
      path: '/create',
      data: {
        botName: botName,
        botFile: "",
        status: true,
        template: true,
        userId: userId
      }
    };

    const paramsJSON: JSON = JSON.parse(JSON.stringify(params));

    this.authService.executeFunction('654cce698458b074ddd0', paramsJSON, '/create', 'POST', false)
      .then((response) => {
        console.log("response", response);
        this.router.navigate(['/management'])

      })
      .catch((error) => {
        console.error('Error list of Bot:', error);
      });
 

  }


 

  sendRequest(method: string, serverUrl: string, endpoint: string, data: object): any {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
        var res = this.responseText;
        return JSON.parse(res);
      } else {
        return null;
      }
    });
    xhr.open(method, serverUrl + endpoint);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));
  }


  nameFormatValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      // Define your address format regex here (modify as needed)
      const nameRegex = /^[\u0600-\u06FF\s\.,'-]+$/;
      const isValid = nameRegex.test(control.value);
      return isValid ? null : { nameFormat: true };
    };
  }

  CancelEdit() {
    this.router.navigate(['/management']);
  }



}
