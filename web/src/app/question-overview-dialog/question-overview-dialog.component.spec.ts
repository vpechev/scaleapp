import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionOverviewDialogComponent } from './question-overview-dialog.component';

describe('QuestionOverviewDialogComponent', () => {
  let component: QuestionOverviewDialogComponent;
  let fixture: ComponentFixture<QuestionOverviewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionOverviewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionOverviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
