import { TestBed } from '@angular/core/testing';

import { ChatInjectorService } from './chat-injector.service';

describe('ChatInjectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatInjectorService = TestBed.get(ChatInjectorService);
    expect(service).toBeTruthy();
  });
});
