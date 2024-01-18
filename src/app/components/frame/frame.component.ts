import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css']
})
export class FrameComponent {
  
  @Output() close = new EventEmitter<void>();

  closeComposeView() {
    this.close.emit();
  }
}
