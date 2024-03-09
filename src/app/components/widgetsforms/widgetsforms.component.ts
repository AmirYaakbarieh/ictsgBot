import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-widgetsforms',
  templateUrl: './widgetsforms.component.html',
  styleUrls: ['./widgetsforms.component.css']
})
export class WidgetsformsComponent implements OnInit, OnDestroy{

  items: any[] = [];

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
    buildAutomatic1: false,
    buildAutomatic2: false,
    buildAutomatic3: false,
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

  one1() {
    this.showInput.buildAutomatic1 = false
  }
  
  two2() {
    this.showInput.buildAutomatic2 = false
  }
  three3() {
    this.showInput.buildAutomatic3 = false
  }
   addItem() {
      this.items.push({}); // اضافه کردن یک آیتم جدید به آرایه
  }

}
