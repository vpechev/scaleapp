import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Question } from '../models/question.model';
import { NotificationService } from '../services/notification.service';
import { InterviewQuestionsService } from '../services/interview-questions.service';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-question-overview-dialog',
  templateUrl: './question-overview-dialog.component.html',
  styleUrls: ['./question-overview-dialog.component.css']
})
export class QuestionOverviewDialogComponent implements OnInit {
  checkIcon = faCheck;
  removeIcon = faTimes;
  
  constructor(public dialogRef: MatDialogRef<QuestionOverviewDialogComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: Question,
              private interviewQuestionsService: InterviewQuestionsService,
              private notificationService: NotificationService) {}

  ngOnInit() { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  markAnsweredQuestion(selectedQuestion: Question): void {
    this.interviewQuestionsService.addAnsweredQuestion(selectedQuestion);
    this.notificationService.showInfo("","Question was answered");
    this.dialogRef.close();
  }

  markNotAnsweredQuestion(selectedQuestion: Question): void {
    this.interviewQuestionsService.addNotAnsweredQuestions(selectedQuestion);
    this.notificationService.showInfo("","Question was NOT answered");
    this.dialogRef.close();
  }

}
