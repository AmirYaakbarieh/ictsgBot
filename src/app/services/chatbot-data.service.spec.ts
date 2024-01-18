import { TestBed } from '@angular/core/testing';

import { ChatbotDataService } from './chatbot-data.service';

describe('ChatbotDataService', () => {
  let service: ChatbotDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatbotDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
