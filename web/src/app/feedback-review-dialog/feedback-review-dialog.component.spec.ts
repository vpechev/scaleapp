import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackReviewDialogComponent } from './feedback-review-dialog.component';

describe('FeedbackReviewDialogComponent', () => {
  let component: FeedbackReviewDialogComponent;
  let fixture: ComponentFixture<FeedbackReviewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackReviewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackReviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
