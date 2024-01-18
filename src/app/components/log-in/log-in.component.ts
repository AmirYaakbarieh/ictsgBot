import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  
  reactiveForm: FormGroup


  email: string;
  password: string;
  user: any;

  userID: string;
  URLforMenu: string;

  loginSession: string;

  isLogin: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }
  
  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email, this.emailFormatValidator()]),
      password: new FormControl(null, [Validators.required]),
      rememberMe: new FormControl(false), // Add rememberMe FormControl
    });
  }

  
  onSubmit() {
    console.log(this.reactiveForm);

    const rememberMeValue = this.reactiveForm.get('rememberMe')?.value;
    console.log('Remember Me:', rememberMeValue);

    const email = this.reactiveForm.get('email')?.value;
    const password = this.reactiveForm.get('password')?.value;

    this.authService.login(email, password).then((session) => {
      if (session) {
        console.log('Login successful');
        console.log(session);

        this.userID = this.authService.userId;
        console.log(this.userID);
        this.authService.getUserInfo(this.userID);
        // this.URLforMenu = this.authService.profilePicURLforMenu;
        // console.log(this.URLforMenu)

        console.log(this.user);
        this.loginSession = this.authService.currentSessionId;
        this.isLogin = true;
        this.goToUserDashboard();

      } else {
        console.log('Login failed');
        // Optionally, you can display an error message or handle the failure
        this.isLogin = false;
        alert(' ارتباط با اینترنت را چک کنید٬ در غیر اینصورت  آدرس ایمیل یا رمز عبور شما صحیح نیست      ')
        
      }
    });
  }

  goToUserDashboard(){
    if (this.isLogin){
      this.router.navigate([`/sidebar`])
    }
  }

  
  // emailFormatValidator(): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: any } | null => {
  //     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  //     const isValid = emailRegex.test(control.value);
  //     return isValid ? null : { emailFormat: true };
  //   };
  // }

  emailFormatValidator(): ValidatorFn {
    return (control: FormControl): { [key: string]: any } | null => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const isValid = emailRegex.test(control.value);
      return isValid ? null : { emailFormat: true };
    };
  }

}
