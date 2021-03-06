import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LocalMaterialModule } from '../material-module';
import { AppComponent } from './app.component';
import { CriteriaComponent } from './criteria/criteria.component';
import { NotesComponent } from './notes/notes.component';
import { FeedComponent } from './feed/feed.component';
import { ComplexityColorPipe } from './pipes/complexity-color.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuestionOverviewDialogComponent } from './question-overview-dialog/question-overview-dialog.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ConfigService } from './services/config.service';
import { CategoryLabelPipe } from './pipes/category-label.pipe';
import { AreaLabelPipe } from './pipes/area-label.pipe';
import { ToastrModule } from 'ngx-toastr';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { KeyboardShortcutsModule } from 'ng-keyboard-shortcuts';
import { FeedbackReviewDialogComponent } from './feedback-review-dialog/feedback-review-dialog.component';  
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CorrectAnsweredQuestionColorPipe } from './pipes/correct-answered-question-color.pipe';
import { IncorrectAnsweredQuestionColorPipe } from './pipes/incorrect-answered-question-color.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CriteriaComponent,
    NotesComponent,
    QuestionOverviewDialogComponent,
    FeedComponent,
    ComplexityColorPipe,
    CategoryLabelPipe,
    AreaLabelPipe,
    FeedbackReviewDialogComponent,
    CorrectAnsweredQuestionColorPipe,
    IncorrectAnsweredQuestionColorPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LocalMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    LocalMaterialModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    KeyboardShortcutsModule.forRoot(),
    AutocompleteLibModule,
    NgSelectModule,
    NgOptionHighlightModule,
    FontAwesomeModule
  ],
  entryComponents: [QuestionOverviewDialogComponent, FeedbackReviewDialogComponent],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: load,
    deps: [
      HttpClient,
      ConfigService
    ],
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

function load(http: HttpClient, config: ConfigService): (() => Promise<boolean>) {
  return (): Promise<boolean> => {
    return config.initService();
  };
}