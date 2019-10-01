import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LocalMaterialModule } from '../material-module';
import { AppComponent } from './app.component';
import { CriteriaComponent } from './criteria/criteria.component';
import { NotesComponent } from './notes/notes.component';
import { FeedComponent } from './feed/feed.component';
import { ComplexityColorPipePipe } from './pipes/complexity-color-pipe.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuestionOverviewDialogComponent } from './question-overview-dialog/question-overview-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    CriteriaComponent,
    NotesComponent,
    QuestionOverviewDialogComponent,
    FeedComponent,
    ComplexityColorPipePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LocalMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    LocalMaterialModule
  ],
  entryComponents: [QuestionOverviewDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
