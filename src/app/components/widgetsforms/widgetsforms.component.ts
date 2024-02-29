import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-widgetsforms',
  templateUrl: './widgetsforms.component.html',
  styleUrls: ['./widgetsforms.component.css']
})
export class WidgetsformsComponent implements OnInit, OnDestroy{

  constructor(private appComponent: AppComponent){}
  
  
  ngOnInit(): void {
    this.appComponent.showFooter = false;
   
  }

  ngOnDestroy(): void {
    this.appComponent.showFooter = true;
  }

  numberOfSteps: number = 3;
  currentStep: number = 1;
  openOne: Boolean = false;
  showInput = {
    buildAutomatic: false,
    // Add other options here with default value false

  };
  buildAutomatic: boolean = false


  saveAndMoveToNextStep() {
    if (this.currentStep < 10) {
      this.currentStep++;
    }
  }

  goBack() {
    this.moveToPreviousStep();
  }

  setStep(step: number) {
    if (step > this.currentStep) {
      // انتقال به مرحله بعدی
      this.currentStep = step;
    } else if (step < this.currentStep) {
      // انتقال به مرحله قبلی
      this.currentStep = step;
    }
  }

  moveToPreviousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  saveForm() {

  }

  openOneFun() {
    this.openOne = true
  }

  toggleInput(option: string) {
    // Toggle the corresponding option
    this.showInput[option] = !this.showInput[option];
  }

  one() {
    this.showInput.buildAutomatic = false
  }
  two() {
    this.showInput.buildAutomatic = false
  }
  three() {
    this.showInput.buildAutomatic = false
  }
  four() {
    this.showInput.buildAutomatic = false
  }



}
