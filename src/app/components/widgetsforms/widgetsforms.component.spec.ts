import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetsformsComponent } from './widgetsforms.component';

describe('WidgetsformsComponent', () => {
  let component: WidgetsformsComponent;
  let fixture: ComponentFixture<WidgetsformsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WidgetsformsComponent]
    });
    fixture = TestBed.createComponent(WidgetsformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
