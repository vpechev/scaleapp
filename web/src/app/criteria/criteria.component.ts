import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Area } from '../enums/area.enum';
import { Category } from '../enums/category.enum';
import { DataLoaderService } from '../services/data-loader.service';
import { Question } from '../models/question.model';
import { MatDialog } from '@angular/material/dialog';
import { QuestionOverviewDialogComponent } from '../question-overview-dialog/question-overview-dialog.component';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit {
  criteriaForm: FormGroup;
  
  keys = Object.keys;
  areas = Area;
  categories = Category;
  
  private selectedCategory: Category;
  private selectedArea: Area;

  @Output() searchResultQuestionsEmitter = new EventEmitter<Question[]>();
  
  constructor(public dialog: MatDialog, 
              private formBuilder: FormBuilder,
              private service: DataLoaderService) {
  }

  ngOnInit() {
    this.criteriaForm = this.formBuilder.group({
      areaFormControl: new FormControl(''),
      categoryFormControl: new FormControl(''),
      searchInputFormControl: new FormControl('')
    });

    if(!this.selectedArea) {
      this.criteriaForm.get('categoryFormControl').disabled;
    }

    this.areas = Area;
    this.categories = Category;
   }

  public changeArea(areaElement) {
    this.selectedArea = areaElement.value.substr(3);
    this.categories = Category;

    this.service.getByArea(this.selectedArea).subscribe((res : Question[])=>{
      console.log(res);
      this.searchResultQuestionsEmitter.emit(res);
    });
  }

  public changeCategory(categoryElement) {
    this.selectedCategory = categoryElement.value.substr(3);

    this.service.getByAreaAndCategory(this.selectedArea, this.selectedCategory).subscribe((res : Question[])=>{
      console.log(res);
      this.searchResultQuestionsEmitter.emit(res);
    });
  }

  public onSearch() {
    let searchedValue = this.criteriaForm.get('searchInputFormControl').value;
    if(!!searchedValue) {
      this.service.search(searchedValue, this.selectedArea, this.selectedCategory).subscribe((result : Question[])=>{
        if(!!result){
          this.openDialog(result[0]);
          this.criteriaForm.controls['searchInputFormControl'].reset();
        }
      }); 
    }
  }

  onReset() {
    this.criteriaForm.reset();
    this.selectedArea = null;
    this.selectedCategory = null;
    this.service.getRandomQuestions(10).subscribe((res : Question[])=>{
      console.log(res);
      this.searchResultQuestionsEmitter.emit(res);
    });  
  }

  private openDialog(selectedQuestion: Question): void {
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
}
