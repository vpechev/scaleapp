import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Question } from '../models/question.model';

@Component({
  selector: 'app-question-overview-dialog',
  templateUrl: './question-overview-dialog.component.html',
  styleUrls: ['./question-overview-dialog.component.css']
})
export class QuestionOverviewDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<QuestionOverviewDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Question) {}

  ngOnInit() {  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
