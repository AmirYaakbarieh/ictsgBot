import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  languageMode = false;
  languageModeMin = false;

  

  private profilePicURLSource = new BehaviorSubject<string>('');
  profilePicURL$ = this.profilePicURLSource.asObservable();

  private logoPicURLSource = new BehaviorSubject<string>('');
  logoPicURL$ = this.logoPicURLSource.asObservable();

  setProfilePicURL(url: string) {
    this.profilePicURLSource.next(url);
  }

  setLogoPicURL(url: string) {
    this.logoPicURLSource.next(url);
  }

 
  clearProfileData() {
    // Reset data when user signs out
    this.profilePicURLSource.next('');
  }

  clearLogoData() {
    // Reset data when user signs out
    this.logoPicURLSource.next('');
  }

  constructor() { }


  languageChangeMode() {
    this.languageMode = !this.languageMode;
  }

  languageChangeModeMin() {
    this.languageModeMin = !this.languageModeMin;
    this.languageMode = !this.languageMode;
  }


}
