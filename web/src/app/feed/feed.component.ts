import { Component, OnInit, Inject, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Question } from '../models/question.model';
import { DataLoaderService } from '../services/data-loader.service';
import { QuestionOverviewDialogComponent } from '../question-overview-dialog/question-overview-dialog.component';
import { Area } from '../models/area.model';
import { InterviewQuestionsService } from '../services/interview-questions.service';
import { NotificationService } from '../services/notification.service';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  checkIcon = faCheck;
  removeIcon = faTimes;
  questions: Question[];
  areas: Area[];
  
  constructor(public dialog: MatDialog, 
              private dataLoaderService: DataLoaderService,
              private interviewQuestionsService: InterviewQuestionsService,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.dataLoaderService.getRandomQuestions(10).subscribe((res : Question[])=>{
      this.questions = res as Question[];
    });  
  }

  openDialog(selectedQuestion: Question): void {
    const dialogRef = this.dialog.open(QuestionOverviewDialogComponent, {
      width: '500px',
      data: {
        question: selectedQuestion.question, 
        answer: selectedQuestion.answer,
        notes: selectedQuestion.notes
      }
    });

    // dialogRef.afterClosed().subscribe(result => {});
  }

  markAnsweredQuestion(selectedQuestion: Question): void {
      this.interviewQuestionsService.addAnsweredQuestion(selectedQuestion);
      this.notificationService.showInfo("","Question was answered");
  }

  markNotAnsweredQuestion(selectedQuestion: Question): void {
    this.interviewQuestionsService.addNotAnsweredQuestions(selectedQuestion);
    this.notificationService.showInfo("","Question was NOT answered");
  }

  getFilteredQuestions(filteredQuestion: Question[]) {
    if(!!filteredQuestion && filteredQuestion.length > 0) {
      this.questions = filteredQuestion;
    }
  }

  getAreas(areas: Area[]) {
    this.areas = areas;
  }
}
