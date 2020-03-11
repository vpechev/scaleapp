import { Component, Input, OnInit, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { DataLoaderService } from '../services/data-loader.service';
import { Question } from '../models/question.model';
import { MatDialog } from '@angular/material/dialog';
import { QuestionOverviewDialogComponent } from '../question-overview-dialog/question-overview-dialog.component';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DropdownsService } from '../services/dropdowns.service';
import { Area } from '../models/area.model';
import { Complexity } from '../models/complexity.model';
import { Category } from '../models/category.model';
import { NotificationService } from '../services/notification.service';
import { NgSelectComponent } from '@ng-select/ng-select';
import { ShortcutInput } from 'ng-keyboard-shortcuts';

@Component({
  selector: 'app-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit {
  private readonly BUTTON_ONE_KEY_CODE : number = 49;
  private readonly BUTTON_TWO_KEY_CODE : number = 50;
  private readonly BUTTON_THREE_KEY_CODE : number = 51;
  private readonly BUTTON_FOUR_KEY_CODE : number = 52;
  private readonly BUTTON_FIVE_KEY_CODE : number = 53;
  private readonly BUTTON_TILDA_KEY_CODE : number = 192;
  private readonly BUTTON_F2_KEY_CODE: number = 113;
  
  criteriaForm: FormGroup;
  
  keys = Object.keys;
  categories : Category[];
  complexities : Complexity[];
  areas : Area[];

  @ViewChild('areaSelect', null) 
  areaSelect: NgSelectComponent;

  @ViewChild('categorySelect', null) 
  categorySelect: NgSelectComponent;

  @ViewChild('complexitySelect', null) 
  complexitySelect: NgSelectComponent;

  @ViewChild('searchInput', null)
  searchInput: ElementRef;

  private selectedCategoryKey: string;
  private selectedAreaKey: string;
  private selectedComplexityKey: string;

  @Output() searchResultQuestionsEmitter = new EventEmitter<Question[]>();
  @Output() areasEmitter = new EventEmitter<Area[]>();
  
  constructor(public dialog: MatDialog, 
              private formBuilder: FormBuilder,
              private service: DataLoaderService,
              private dropdownsService: DropdownsService,
              private notifyService : NotificationService) {
  } 

  ngOnInit() {
    this.criteriaForm = this.formBuilder.group({
      areaFormControl: new FormControl(''),
      categoryFormControl: new FormControl(''),
      complexityFormControl: new FormControl(''),
      searchInputFormControl: new FormControl('')
    });

    this.dropdownsService.getAllAreas().subscribe((res : Area[]) => {
      this.areas = res;
      this.areasEmitter.emit(this.areas);
    });

    this.dropdownsService.getComplexityOptions().subscribe((res : Area[]) => this.complexities = res);

    this.onReset();
  }

  @HostListener('document:keydown', ['$event']) onKeydown(event: KeyboardEvent) {
    if(event.ctrlKey) {
      switch(event.keyCode) {
        case this.BUTTON_ONE_KEY_CODE:  //pressed ctrl+1 
          event.preventDefault(); 
          this.toggleSelect(this.areaSelect); 
          this.categorySelect.close();
          this.complexitySelect.close();
          this.notifyService.showSuccess("","Area dropdown was toggled");
          break;
        case this.BUTTON_TWO_KEY_CODE: //pressed ctrl+2
          event.preventDefault(); 
          this.toggleSelect(this.categorySelect); 
          this.areaSelect.close();
          this.complexitySelect.close();
          this.notifyService.showSuccess("","Category dropdown was toggled");
          break;
        case this.BUTTON_THREE_KEY_CODE: //pressed ctrl+3
          event.preventDefault();
          this.toggleSelect(this.complexitySelect); 
          this.areaSelect.close();
          this.categorySelect.close();
          this.notifyService.showSuccess("","Complexity dropdown was toggled");
          break;
        case this.BUTTON_FOUR_KEY_CODE: //pressed ctrl+4
          event.preventDefault(); 
          this.focusInput(this.searchInput);
          this.closeAllSelectElements();
          this.notifyService.showSuccess("","Search input was focused");
          break;
        case this.BUTTON_FIVE_KEY_CODE: //pressed ctrl+5
          event.preventDefault(); 
          this.onSearch();
          this.closeAllSelectElements();
          break;
        case this.BUTTON_TILDA_KEY_CODE:
          event.preventDefault(); 
          this.onReset(); 
          this.closeAllSelectElements();
          this.notifyService.showSuccess("","Search critia was reset");
          break;
        case this.BUTTON_F2_KEY_CODE: 
          event.preventDefault();
          this.closeAllSelectElements();
          break;
      }
    }
  }

  public changeArea() {
    if(!!this.selectedAreaKey) {
      this.selectedCategoryKey = null;
      this.criteriaForm.get('categoryFormControl').reset();
      this.categories = this.areas.find(x => x.key === this.selectedAreaKey).categories;

      if(this.categories.length > 0) {
        this.criteriaForm.get('categoryFormControl').enable();
      }

      this.service.search(null, this.selectedAreaKey, null, this.selectedComplexityKey)
                  .subscribe((result : Question[]) => this.searchResultQuestionsEmitter.emit(result));
      this.notifyService.showSuccess("","New Search was performed");
    }
  }

  public changeCategory() {
    if(!!this.selectedCategoryKey) {
      this.service.search(null, this.selectedAreaKey, this.selectedCategoryKey, this.selectedComplexityKey).subscribe((result : Question[])=>{
        this.searchResultQuestionsEmitter.emit(result);
      });
      this.notifyService.showSuccess("","New Search was performed");
    }
  }

  public changeComplexity() {
    if(this.selectedComplexityKey == '0' || !!this.selectedComplexityKey) {
      this.service.search(null, this.selectedAreaKey, this.selectedCategoryKey, this.selectedComplexityKey).subscribe((result : Question[])=>{
        this.searchResultQuestionsEmitter.emit(result);
      });
      this.notifyService.showSuccess("","New Search was performed");
    }
  }

  public onSearch() {
    let searchedValue = this.criteriaForm.get('searchInputFormControl').value;
    if(!!searchedValue) {
      this.service.search(searchedValue, this.selectedAreaKey, this.selectedCategoryKey, this.selectedComplexityKey)
                  .subscribe((result : Question[]) => this.onSearchResponseReceived(result)); 
    }
    this.notifyService.showSuccess("","New Search was performed");
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

  private onSearchResponseReceived(result: Question[]) {    
    if(!!result && result.length > 0) {
      if(result.length == 1) {
        this.openDialog(result[0]);
      } 
      
      this.searchResultQuestionsEmitter.emit(result);
    } else {
      this.notifyService.showWarning("","No result matches to passed search criteria");
    }
  }

  private toggleSelect(select: NgSelectComponent) {
    if(select.isOpen){
      select.close();
    } else {
      select.open();
    }
  }

  private focusInput(input: ElementRef) {
    input.nativeElement.focus();
    this.onFocusSearchInput();
  }

  private onFocusSearchInput(){
    this.criteriaForm.controls['searchInputFormControl'].reset();
  }

  private closeAllSelectElements(){
    this.areaSelect.close();
    this.categorySelect.close();
    this.complexitySelect.close();
  }

  private openDialog(selectedQuestion: Question): void {
    const dialogRef = this.dialog.open(QuestionOverviewDialogComponent, {
      width: '500px',
      data: {
        question: selectedQuestion.question, 
        answer: selectedQuestion.answer,
        notes: selectedQuestion.notes
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
