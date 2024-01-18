import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { editORGInfo, editUserInfo } from 'src/models/chatbot-node.models';
import { LanguageService } from 'src/app/services/language.service';





@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})





export class DashboardComponent implements OnInit, OnDestroy {

  userId: string = '';
  userName: string = '';
  emailOfUser: string = '';
  passwordOfUser: string= '';
  emailValue: string;
  nameValue: string;
  phoneValue: any;
  phoneNumberOfUser: string ='';
  complateNameValue: string;
  addressValue: string;
  addressValueOfORG: string;
  cityValue: string;
  streetValue: string;
  postalCodeValue: string;
  organizationNameValue: string;
  websiteNameValue: string;
  organizationEmailValue: string;
  orgMembersValue: number;
  activitylValue: string;
  phoneOrgValue: string

  address: string;
  city:string;
  fullName: string;
  street: string;
  type: string;
  postCode: string; 

  orgAddress: string;
  orgWebsite: string;
  orgActivityZone: string;
  orgId: string;
  nameOfOrg:string;
  orgEmail: string;
  orgPhone: string;
  orgMembers: number;

  fileId: string;

  



 




  paramsOfUsers: editUserInfo;

  editORG: editORGInfo

  isMenuOpen: boolean = true;

  selectedImage: string | ArrayBuffer | null = null;
  
  selectedLogo: string | ArrayBuffer | null = null;

  selectedFilePath: string | null = null;
  
  selectedFilePathLogo: string | null = null;


  isDivVisible: boolean = true;

  reactiveForm: FormGroup;

  isRegister: boolean = false;

  isSuccessful: boolean = false;

  showPhoto: boolean = false;

  showLogo: boolean = false;

  profilePicURL: string | ArrayBuffer | null = null;

  logoPicURL: string | ArrayBuffer | null = null;

  logoURL: string

  

  constructor(private authService: AuthService, private router: Router, private http: HttpClient, private sharedService: LanguageService) { }
 

  ngOnDestroy(): void {
    this.phoneNumberOfUser = this.authService.phoneNumberOfUser;
  }


  ngOnInit(): void {

    this.sharedService.profilePicURL$.subscribe((url) => {
      this.profilePicURL = url;
    });

    this.sharedService.logoPicURL$.subscribe((url) => {
      this.logoPicURL = url;
    });

    this.userId = this.authService.userId;
    console.log(this.userId)
    this.userName = this.authService.nameOfUser;
    this.emailOfUser = this.authService.emailOfUser;
    this.passwordOfUser = this.authService.passwordOfUser;
    if (this.authService.passwordOfUser){
      this.phoneNumberOfUser = this.authService.phoneNumberOfUser;
      console.log(this.phoneNumberOfUser)
    }
    if (!this.authService.passwordOfUser){
      this.phoneNumberOfUser = '';
      console.log(this.phoneNumberOfUser)
    }

    console.log(this.passwordOfUser)

    this.reactiveForm = new FormGroup({
      personalDetails: new FormGroup({
        firstName: new FormControl(null, [Validators.required]),
        complateName: new FormControl(null, [Validators.required, this.nameFormatValidator()]),
        Address: new FormControl(null, [Validators.required, this.AdrressFormatValidator()]),
        city: new FormControl(null, [Validators.required, this.nameFormatValidator()]),
        street: new FormControl(null, [Validators.required, this.AdrressFormatValidator()]),
        code: new FormControl(null, [Validators.required, this.postalCodeFormatValidator()]),
        phoneNumber: new FormControl(null, [Validators.required, this.phoneNumberFormatValidator()]),
        nameOfUsers: new FormControl(null, [Validators.required]),
        userEmail: new FormControl(null, [Validators.required, Validators.email, this.emailFormatValidator()]),
        nameOfUser: new FormControl(null, [Validators.required, this.nameFormatValidator()]),
        organizationName: new FormControl(null, [Validators.required, this.nameFormatValidator()]),
        organizationWebsite: new FormControl(null, [Validators.required, this.webSiteFormatValidatorOfUser()]),
        organizationOfEmail: new FormControl(null, [Validators.required, Validators.email, this.emailFormatValidator()]),
        orgPhone: new FormControl(null, [Validators.required, this.phoneNumberFormatValidator() ]),
        organizationMemberCount: new FormControl(null, [Validators.required, this.organizationMemberCount() ]),
        activity: new FormControl(null, [Validators.required]),
      }),
    })


    this.authService.selectedImage$.subscribe((imagePath) => {
      this.selectedImage = imagePath;
    });

    this.authService.selectedImageLogo$.subscribe((imagePath) => {
      this.selectedLogo = imagePath;
    });

    
    this.authService.getUser(this.userId);

  
    this.authService.getUserInfo(this.userId).then((response) => {
        if (response) {
          this.address = response.address;
          this.city = response. city;
          this.fullName = response.fullName;
          this.street = response.street;
          this.type = response.type;
          this.postCode = response.postCode;
        
          this.orgId = response.organizationId.$id;
          this.nameOfOrg = response.organizationId.name
          this.orgWebsite = response.organizationId.website;
          this.orgEmail = response.organizationId.email;
          this.orgPhone = response.organizationId.phone;
          this.orgAddress = response.organizationId.address;
          this.orgMembers = response.organizationId.memberCount;
          this.orgActivityZone = response.organizationId.activityZone;
          console.log(this.orgId, this.nameOfOrg, this.orgWebsite, this.orgEmail, this.orgPhone, this.orgAddress, this.orgMembers)
          
        } else {
          // Handle the case when the response is falsy (error occurred)
        }
      })
      .catch((error) => {
        // Handle the error
        console.error('Error getting user info:', error);
      });


    
    
  }
  

 

  // onFileSelected(event: any): void {
  //   const fileInput = event.target;
  //   if (fileInput.files && fileInput.files[0]) {
  //     const reader = new FileReader();

  //     reader.onload = (e) => {
  //       // Update the selectedImage with the selected image data URL
  //       this.selectedImage = e.target?.result;
  //     };

  //     reader.readAsDataURL(fileInput.files[0]);
  //   }
  // }


  onFileSelected(event: any): void {

    this.showPhoto = !this.showPhoto;
    
    const fileInput = event.target;
    
    console.log((fileInput.files && fileInput.files[0]))
    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();

      if (fileInput.files[0].size > 20 * 1024) {
        // alert('File size exceeds 20 KB. Please choose a smaller file.');
        alert('حجم فایل بیش از 20 کیلوبایت است. لطفا یک فایل کوچکتر انتخاب کنید');
        return;
      }

      reader.onload = (e) => {
        // Update the selectedImage with the selected image data URL
        this.selectedImage = e.target?.result as string;

        this.authService.setSelectedImage(this.selectedImage);

        this.selectedFilePath = fileInput.value;
        console.log(this.selectedFilePath)
      };

      reader.readAsDataURL(fileInput.files[0]);
    }
    
    this.authService.createFile("651134e7bb7d7d3c4fe1", fileInput.files[0])
      .then((response) => {
        console.log('****************************************************')
        console.log(response);
        this.fileId = response.$id;
        console.log(this.fileId)
      })

  }



  setPhoto(){
    this.authService.saveInputFile(this.fileId, 'profile', this.userId).then((response) => {
      console.log(response.profilePic.url)
      if (response.profilePic.url){
        this.router.navigate([`/login`])
      }
    })
  }

  // -------------------------------------------------------------------
  onFileSelectedLogo(event: any){
    
    this.showLogo = !this.showLogo


    const fileInputLogo = event.target;

    console.log((fileInputLogo.files && fileInputLogo.files[0]))
    if (fileInputLogo.files && fileInputLogo.files[0]) {
      const reader = new FileReader();

      if (fileInputLogo.files[0].size > 20 * 1024) {

        alert('حجم فایل بیش از 20 کیلوبایت است. لطفا یک فایل کوچکتر انتخاب کنید');
        return;
      }

      reader.onload = (e) => {

        this.selectedLogo = e.target?.result as string;

        this.authService.setSelectedImageLogo(this.selectedLogo);

        this.selectedFilePathLogo = fileInputLogo.value;
        console.log(this.selectedFilePathLogo)
      };

      reader.readAsDataURL(fileInputLogo.files[0]); 
    }

    this.authService.createFile("651134e7bb7d7d3c4fe1", fileInputLogo.files[0])
      .then((response) => {
        console.log('****************************************************')
        console.log(response);
        this.fileId = response.$id;
        console.log(this.fileId)
      })

  }

  setLogo() {
    this.authService.saveInputFileLogo(this.fileId, 'logo', this.orgId).then((response) => {
      console.log(response.logoPic)
      this.logoURL = response.logoPic.url
      console.log(this.logoURL)
      if (response.logoPic) {
        this.router.navigate([`/login`])
      }
    })
  }

  // -------------------------------------------------------------------
  setEmail(){
    const pass = prompt('لطفا رمز عبور خود را وارد کنید')
    console.log(pass);
    if (pass == this.passwordOfUser){
      // this.authService.updateUserEmail(this.emailOfUser, pass);
      
      this.setEmailOfUser(this.emailValue)
      
    }else{
      alert('رمز عبور شما صحیح نیست ٬ دوباره امتحان امتحان کنید')
    }
  }

  setEmailOfUser(valueOfEmail: string){
    this.authService.updateUserEmail(valueOfEmail, this.passwordOfUser);
    if (this.userName && valueOfEmail && this.passwordOfUser) {
      this.router.navigate([`/login`])
    }
  }
  
  // changEmail(valueOfEmail: string){
  //   // console.log(this.userName)
  //   // console.log(valueOfEmail)
  //   // console.log(this.passwordOfUser)
  //   this.authService.updateUserEmail( valueOfEmail, this.passwordOfUser)
  //   // if (this.userName && valueOfEmail && this.passwordOfUser){
  //   if (this.userName && valueOfEmail && this.passwordOfUser){
  //     // this.router.navigate([`/login`])
  //     console.log("Ok")
  //   }
  // }

  // -------------------------------------------------------------------
  setPhoneNumber() {
    const pass = prompt('لطفا رمز عبور خود را وارد کنید')
    console.log(pass);
    if (pass == this.passwordOfUser) {
      // this.authService.updateUserEmail(this.emailOfUser, pass);
      this.setPhoneNumberOfUser(this.phoneValue)

    } else {
      alert('رمز عبور شما صحیح نیست ٬ دوباره امتحان امتحان کنید')
    }
  }

  setPhoneNumberOfUser(phoneValue: string){
    this.authService.updatePhoneNumber(phoneValue, this.passwordOfUser);
    this.router.navigate([`/login`]) 
  }


  // changPhone(phoneValue: string) {
  //   console.log(phoneValue);
  //   this.authService.updatePhoneNumber(phoneValue, this.passwordOfUser);
  //   if (this.userName &&  phoneValue && this.passwordOfUser) {
  //     this.router.navigate([`/login`])
      
  //   }
  // }

  // -------------------------------------------------------------------
  

  setName(){
    console.log(this.nameValue);
    this.setNameOfUser(this.nameValue)
  }

  setNameOfUser(name: string){
    this.authService.updateUserName(name);
    this.router.navigate([`/login`])
  }
  
  // changName(nameValue: string){
  //   // console.log(nameValue);
  //   // this.authService.updateUserName(nameValue);
  //   // if (nameValue) {
  //   //   // this.router.navigate([`/login`])
  //     // console.log("Ok")
  //   // }
  // }
  
  
  
  

  setPersonalInformation(){
    console.log(this.complateNameValue);
    console.log(this.addressValue);
    console.log(this.cityValue);
    console.log(this.streetValue);
    console.log(this.postalCodeValue);

    this.authService.editUser(this.userId, this.complateNameValue, this.userName, this.cityValue, this.streetValue, this.addressValue, this.postalCodeValue, "manager").then((success) => {
      if (success) {
        console.log('Upload file successful');
        this.isRegister = true;
        this.authService.getUserInfo(this.userId)
        this.router.navigate([`/login`])
      } else {
        console.log('Upload file failed');
        this.isRegister = false;
        alert('لطفا اطلاعات فرم را کامل کنید')
      }
    });
  }

  setOrganizationalInformation(){
    console.log(this.organizationNameValue);
    console.log(this.websiteNameValue);
    console.log(this.phoneOrgValue);
    console.log(this.organizationEmailValue);
    console.log(this.orgMembersValue);
    console.log(this.addressValueOfORG);
    console.log(this.activitylValue);

    this.authService.editORGInfo(this.orgId, this.organizationNameValue, this.websiteNameValue, this.organizationEmailValue, this.phoneOrgValue, this.addressValueOfORG,  this.orgMembersValue,  this.activitylValue).then((success) => {
      if (success) {
        console.log('Upload file successful');
        this.isSuccessful = true;

        this.router.navigate([`/login`])
      } else {
        console.log('Upload file failed');
        this.isSuccessful = false;
        alert('لطفا اطلاعات فرم را کامل کنید')
      }
    });
  }




  onSubmit(){

  }





  emailFormatValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const isValid = emailRegex.test(control.value);
      return isValid ? null : { emailFormat: true };
    };
  }

  emailFormatValidatorOfUser(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const isValid = emailRegex.test(control.value);
      return isValid ? null : { emailFormat: true };
    };
  }


  webSiteFormatValidatorOfUser(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const websiteRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-._%+-]*)*\/?$/;
      const isValid = websiteRegex.test(control.value);
      return isValid ? null : { webFormat: true };
    };
  }

  phoneNumberFormatValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const phoneRegex = /^\+[0-9]{12}$/;
      const isValid = phoneRegex.test(control.value);
      return isValid ? null : { phoneNumberFormat: true };
    };
  }
  organizationMemberCount(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const phoneRegex = /^[0-9]{1,}$/;
      const isValid = phoneRegex.test(control.value);
      return isValid ? null : { MemberCount: true };
    };
  }

  postalCodeFormatValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const phoneRegex = /^[0-9]{1,}$/;
      const isValid = phoneRegex.test(control.value);
      return isValid ? null : { postalCodeFormat: true };
    };
  }

  nameFormatValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      // Define your address format regex here (modify as needed)
      const nameRegex = /^[\u0600-\u06FF\s\.,'-]+$/;
      const isValid = nameRegex.test(control.value);
      return isValid ? null : { nameFormat: true };
    };
  }

  AdrressFormatValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      // Define your address format regex here (modify as needed)
      const nameRegex = /^[0-9\u0600-\u06FF\s\.,'-]{1,}$/;
      const isValid = nameRegex.test(control.value);
      return isValid ? null : { adressFormat: true };
    };
  }

  





}
