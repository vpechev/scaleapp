import { Component, OnInit, Inject, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Question } from '../models/question.model';
import { DataLoaderService } from '../services/data-loader.service';
import { QuestionOverviewDialogComponent } from '../question-overview-dialog/question-overview-dialog.component';
import { Area } from '../models/area.model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  questions: Question[];
  areas: Area[];
  
  constructor(public dialog: MatDialog, 
              private service: DataLoaderService) { }

  ngOnInit() {
    this.service.getRandomQuestions(10).subscribe((res : Question[])=>{
      console.log(res);
      this.questions = res as Question[];
    });  
  }

  openDialog(selectedQuestion: Question): void {
    const dialogRef = this.dialog.open(QuestionOverviewDialogComponent, {
      width: '500px',
      data: {
        question: selectedQuestion.question, 
        answer: selectedQuestion.answer
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
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
