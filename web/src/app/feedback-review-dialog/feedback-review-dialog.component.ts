import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Question } from '../models/question.model';
import { DropdownsService } from '../services/dropdowns.service';
import { Area } from '../models/area.model';

@Component({
  selector: 'app-feedback-review-dialog',
  templateUrl: './feedback-review-dialog.component.html',
  styleUrls: ['./feedback-review-dialog.component.css']
})
export class FeedbackReviewDialogComponent implements OnInit {

  answeredQuestionsCount : number;
  notAnsweredQuestionsCount : number;
  totalQuestionsCount : number;

  areas: Area[];

  constructor(public dialogRef: MatDialogRef<FeedbackReviewDialogComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dropdownService: DropdownsService) {}

  ngOnInit() {
    this.answeredQuestionsCount = this.data.answeredQuestions.length;
    this.notAnsweredQuestionsCount = this.data.notAnsweredQuestions.length;
    this.totalQuestionsCount = this.answeredQuestionsCount + this.notAnsweredQuestionsCount;
    
    this.dropdownService.getAllAreas().subscribe((res : Area[]) => {
      this.areas = res;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
