import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBotComponent } from './create-bot.component';

describe('CreateBotComponent', () => {
  let component: CreateBotComponent;
  let fixture: ComponentFixture<CreateBotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateBotComponent]
    });
    fixture = TestBed.createComponent(CreateBotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
