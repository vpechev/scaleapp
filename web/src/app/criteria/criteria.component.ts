import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DataLoaderService } from '../services/data-loader.service';
import { Question } from '../models/question.model';
import { MatDialog } from '@angular/material/dialog';
import { QuestionOverviewDialogComponent } from '../question-overview-dialog/question-overview-dialog.component';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DropdownsService } from '../services/dropdowns.service';
import { Area } from '../models/area.model';
import { Complexity } from '../models/complexity.model';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit {
  criteriaForm: FormGroup;
  
  keys = Object.keys;
  categories : Category[];
  complexities : Complexity[];
  areas : Area[];

  private selectedCategoryKey: string;
  private selectedAreaKey: string;
  private selectedComplexityKey: string;

  @Output() searchResultQuestionsEmitter = new EventEmitter<Question[]>();
  @Output() areasEmitter = new EventEmitter<Area[]>();
  
  constructor(public dialog: MatDialog, 
              private formBuilder: FormBuilder,
              private service: DataLoaderService,
              private dropdownsService: DropdownsService) {
  }

  ngOnInit() {
    this.criteriaForm = this.formBuilder.group({
      areaFormControl: new FormControl(''),
      categoryFormControl: new FormControl(''),
      complexityFormControl: new FormControl(''),
      searchInputFormControl: new FormControl('')
    });

    this.dropdownsService.getAllAreas().subscribe((res : Area[])=> {
      this.areas = res;
      this.areasEmitter.emit(this.areas);
    });

    this.dropdownsService.getComplexityOptions().subscribe((res : Area[])=> {
      this.complexities = res;
    });

    this.onReset();
  }

  public changeArea(areaElement) {
    this.selectedAreaKey = areaElement.value.substr(3).trim();
    this.selectedCategoryKey = null;
    this.criteriaForm.get('categoryFormControl').reset();
    this.categories = this.areas.find(x => x.key === this.selectedAreaKey).categories;

    if(this.categories.length > 0) {
      this.criteriaForm.get('categoryFormControl').enable();
    }

    this.service.getByArea(this.selectedAreaKey).subscribe((res : Question[]) => {
      this.searchResultQuestionsEmitter.emit(res);
    });
  }

  public changeCategory(categoryElement) {
    if("null" != categoryElement.value) {
      this.selectedCategoryKey = categoryElement.value.substr(3).trim();

      this.service.getByAreaAndCategory(this.selectedAreaKey, this.selectedCategoryKey).subscribe((res : Question[]) => {
        this.searchResultQuestionsEmitter.emit(res);
      });
    } else {
      this.selectedCategoryKey = null;
    }
  }

  public changeComplexity(complexityElement) {
    if("null" != complexityElement.value) {
      this.selectedComplexityKey = complexityElement.value.substr(3);

      this.service.getByComplexity(this.selectedComplexityKey).subscribe((res : Question[]) => {
        this.searchResultQuestionsEmitter.emit(res);
      });
    } else {
      this.selectedComplexityKey = null;
    }
  }

  public onSearch() {
    let searchedValue = this.criteriaForm.get('searchInputFormControl').value;
    if(!!searchedValue) {
      this.service.search(searchedValue, this.selectedAreaKey, this.selectedCategoryKey, this.selectedComplexityKey).subscribe((result : Question[])=>{
        if(!!result){
          this.openDialog(result[0]);
          this.criteriaForm.controls['searchInputFormControl'].reset();
        }
      }); 
    }
  }

  onReset() {
    this.criteriaForm.reset();
    this.selectedAreaKey = null;
    this.selectedCategoryKey = null;
    this.selectedComplexityKey = null;
    this.criteriaForm.get('categoryFormControl').disable();
    this.getRandomQuestions();
  }

  private getRandomQuestions(){
    this.service.getRandomQuestions(10).subscribe((res : Question[])=>{
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
