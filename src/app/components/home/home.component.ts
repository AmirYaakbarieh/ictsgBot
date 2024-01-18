import { HttpClient } from '@angular/common/http';
import { Component, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/services/auth.service';
import { ChatbotDataService } from 'src/app/services/chatbot-data.service';
import { IChatbotNode } from 'src/models/chatbot-node.models';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  
  activePanel: number = 1;
  isImageHovered: boolean = false;
  isTextMoved: boolean = false;
  
  isBlurred: boolean = true; 
  isImageVisible: boolean = false; 

  // @HostListener('window:scroll', [])

    constructor(private appComponent: AppComponent,) {}
  
    ngOnDestroy(): void {
      this.appComponent.showHeader = true;
      // this.appComponent.showSecondMenu = false
      // this.appComponent.showThirdMenu = false
  }

  ngOnInit(): void {
    // this.appComponent.showHeader = true;
    // this.appComponent.showSecondMenu = false
    // this.appComponent.showThirdMenu = false
  }

  setActivePanel(panelNumber: number) {
    this.activePanel = panelNumber;
  }

  onScroll(): void {
    // Add logic to determine when to remove blur from text
    if (window.scrollY > 200) {
      this.isBlurred = false;
    }

    // Add logic to determine when to show the image
    if (window.scrollY > 400) {
      this.isImageVisible = true;
    }
  }


  // Function to handle hover effect on the image
  handleImageHover(isHovered: boolean): void {
    this.isImageHovered = isHovered;

    // Apply the move-up class to the text after the image fades out
    if (!isHovered) {
      this.isTextMoved = true;
    }
  }
}



