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

  public areas: Map<string, string>;
  public categories: Map<string, string>;
  
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

    this.areas = this.initAreasMap();
    this.categories = this.initCategoriesMap();
   }

  public changeArea(areaElement) {
    this.selectedArea = areaElement.value;
    this.initCategoriesMap();
    this.searchResultQuestionsEmitter.emit(this.service.getByArea(this.selectedArea));
  }

  public changeCategory(categoryElement) {
    this.selectedCategory = categoryElement.value;
    this.searchResultQuestionsEmitter.emit(this.service.getByAreaAndCategory(this.selectedArea, this.selectedCategory));
  }

  public onSearch() {
    let searchedValue = this.criteriaForm.get('searchInputFormControl').value;
    if(!!searchedValue) {
      let result = this.service.search(searchedValue);
      
      if(!!result){
        this.openDialog(result);
      }
    }
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

  onReset() {
    this.criteriaForm.reset();
  }

  private initAreasMap() {
    let areas = new Map();
    for (let item in Area) {
      areas.set(item, Area[item]);
    }

    return areas;
  }

  private initCategoriesMap() {
    let categories = new Map();

    for (let item in Category) {
      categories.set(item, Category[item]);
    }

    return categories;
  }
}
