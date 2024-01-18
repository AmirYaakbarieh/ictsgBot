import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LanguageService } from 'src/app/services/language.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isUserMenuOpen: boolean = false;
  isMenuOpen: boolean = false;

  isMainMenuOpen = false;
  languageMode = false;
  languageModeMin = false; 

  public sidebarShow: boolean = false;

  isUserSignedIn: boolean =  false; 


  selectedImage: string | ArrayBuffer | null = null;

  profilePicURL: string | ArrayBuffer | null = null;

  selectedFilePath: string | null = null;

  constructor(private router: Router, private authService: AuthService, private sharedService: LanguageService){}
  
  
  ngOnInit(): void {
    this.authService.selectedImage$.subscribe((imagePath) => {
      this.selectedImage = imagePath;
    });

    this.sharedService.profilePicURL$.subscribe((url) => {
      this.profilePicURL = url;
    });
  }

  // ngAfterViewChecked(): void {
  //   if (this.authService.userId) {
  //     this.isUserSignedIn = !this.isUserSignedIn;
  //   }
  // }
  // ngAfterViewInit(): void {
  //   //  if (this.authService.userId) {
  //   //   this.isUserSignedIn = !this.isUserSignedIn;
  //   // }
  // }
  // ngAfterContentChecked(): void {
  //   //  if (this.authService.userId) {
  //   //   this.isUserSignedIn = !this.isUserSignedIn;
  //   // }
  // }
  // ngAfterContentInit(): void {
  //   //  if (this.authService.userId) {
  //   //   this.isUserSignedIn = !this.isUserSignedIn;
  //   // }
  // }
  // ngDoCheck(): void {
  //   //  if (this.authService.userId) {
  //   //   this.isUserSignedIn = !this.isUserSignedIn;
  //   // }
  // }
  // ngOnInit(): void {
  //    if (this.authService.userId) {
  //     this.isUserSignedIn = !this.isUserSignedIn;
  //   }
  // }

  
  @ViewChild('dropdownRef') dropdown: ElementRef;

  @ViewChild('sidebar') sidebar: ElementRef;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.dropdown && this.dropdown.nativeElement) {
      const targetElement = event.target as HTMLElement;
      if (!this.dropdown.nativeElement.contains(targetElement)) {
        this.isUserMenuOpen = false;
      }
    }
  }
  
  // onDocumentClick(event: MouseEvent) {
  //   const targetElement = event.target as HTMLElement;
  //   if (!this.dropdown.nativeElement.contains(targetElement)) {
  //     this.isUserMenuOpen = false;
  //   }
  // }

  toggleUserMenu(event: Event) {
    this.isUserMenuOpen = !this.isUserMenuOpen;
    event.stopPropagation();
  }

  toggleMainMenu(event: Event) {
    this.isMenuOpen = !this.isMenuOpen;
    event.stopPropagation();
  }

  toggleMainMenuOpen() {
    this.isMainMenuOpen = !this.isMainMenuOpen;
  }

  languageChangeMode(){
    this.languageMode = !this.languageMode;
  }

  languageChangeModeMin(){
    this.languageModeMin = !this.languageModeMin;
    this.languageMode = !this.languageMode;
  }

  goToBotRegister() {
    if (this.authService.userId) {
      this.router.navigate(['/users']);
    } else {
      this.isUserSignedIn = !this.isUserSignedIn
    }
    // this.router.navigate(['/users']);
    // console.log('User Id is: ' + this.authService.userId)
    // if (this.authService.userId) {
    //   this.isUserSignedIn = true;
    //   console.log('User Id is: ' + this.authService.userId)
    // } else {
    //   this.isUserSignedIn = false;
    //   console.log('No: ' + this.authService.userId)
    // }
  }

 
 

}
