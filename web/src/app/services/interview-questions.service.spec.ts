import { TestBed } from '@angular/core/testing';

import { InterviewQuestionsService } from './interview-questions.service';

describe('InterviewQuestionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InterviewQuestionsService = TestBed.get(InterviewQuestionsService);
    expect(service).toBeTruthy();
  });
});
