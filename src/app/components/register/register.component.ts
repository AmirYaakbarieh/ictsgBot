import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  reactiveForm: FormGroup  //reactiveForm Property 'reactiveForm' has no initializer and is not definitely assigned in the constructor. we have to go "tsconfig.json" and we set "strict": false,

  confirm_password_str: string = '';
  password_str: string = '';
  isRegister: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }
  
  
  ngOnInit(): void {
   
    this.reactiveForm = new FormGroup({
      personalDetails: new FormGroup({
        firstName: new FormControl(null, [Validators.required, this.onSpaceAllowed, this.persianNameValidator()]),
        email: new FormControl(null, [Validators.required, Validators.email, this.emailFormatValidator()]),
        // email: new FormControl(null, [Validators.required, Validators.email], this.emailNotAllowed),
      }),
      passWord: new FormControl(null, [Validators.required]),
      passWord2: new FormControl(null, [Validators.required])
    })
  }

  // onSubmit() {
  //   console.log(this.reactiveForm);

  //   const name = this.reactiveForm.get('personalDetails.firstName')?.value;
  //   const email = this.reactiveForm.get('personalDetails.email')?.value;
  //   const password = this.reactiveForm.get('passWord')?.value;

  //   this.authService.register(name, email, password).then((success) => {
  //     if (success) {
  //       console.log('Registration successful');
  //       this.isRegister = true;
  //       this.goToUserDashboard();
  //       this.router.navigate([`/login`])
  //     } else {
  //       console.log('Registration failed');
  //       this.isRegister =false;
  //       alert('لطفا اطلاعات فرم را کامل کنید')
  //     }
  //   });

  //   // this.authService.register(name, email, password);

  // }

   onSubmit() {
    console.log(this.reactiveForm);

    const name = this.reactiveForm.get('personalDetails.firstName')?.value;
    const email = this.reactiveForm.get('personalDetails.email')?.value;
    const password = this.reactiveForm.get('passWord')?.value;

     this.authService.singup(name, email, password, null, "manager").then((success) => {
      if (success) {
        console.log('Registration successful');
        this.isRegister = true;
        this.goToUserDashboard();
        this.router.navigate([`/login`])
      } else {
        console.log('Registration failed');
        this.isRegister =false;
        alert('لطفا اطلاعات فرم را کامل کنید')
      }
    });

    // this.authService.register(name, email, password);

  }

  onSpaceAllowed(control: FormControl) {
    if (control.value != null && control.value.indexOf(' ') != -1) {
      return { onSpaceAllowed: true }
    }
    return null;
  }

  persianNameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const persianNameRegex = /^[\u0600-\u06FF\s]+$/; // اعتبارسنجی برای حروف فارسی و فاصله
      const isValid = persianNameRegex.test(control.value);
      return isValid ? null : { persianName: true };
    };

  }

  goToUserDashboard() {
    if (this.isRegister) {
      this.router.navigate([`/dashboard`])
    }
  }

// Custom validator function for checking email format with a period in the domain part
emailFormatValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid = emailRegex.test(control.value);
    return isValid ? null : { emailFormat: true };
  };
}


}
