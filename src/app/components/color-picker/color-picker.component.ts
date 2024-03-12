import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css']
})
export class ColorPickerComponent {
  isOpen: boolean = false;
  currentColor: string = "";
  iconColor: string = "";
  colors: string[] = ['gray', 'red', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink'];
  variants: number[] = [100, 200, 300, 400, 500, 600, 700, 800, 900];

  app() {
    return {
      isOpen: false,
      initColor() {
        this.currentColor = 'red-800';
        this.setIconWhite();
      },
      setIconWhite() {
        this.iconColor = 'text-white';
      },
      setIconBlack() {
        this.iconColor = 'text-black';
      },
    };
  }

  selectColor(color: string, variant: number) {
    this.currentColor = `${color}-${variant}`;
    if (variant < 500) {
      this.setIconBlack();
    } else {
      this.setIconWhite();
    }
  }

  toggleColorPicker() {
    this.isOpen = !this.isOpen;
  }

  setIconWhite() {
    this.iconColor = 'text-white';
  }

  setIconBlack() {
    this.iconColor = 'text-black';
  }

  getColorClass(color: string, variant: number): string {
    return `bg-${color}-${variant}`;
  }
}
