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
import { EnumToArrayPipe } from './pipes/enum-to-array.pipe';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ConfigService } from './services/config.service';

@NgModule({
  declarations: [
    AppComponent,
    CriteriaComponent,
    NotesComponent,
    QuestionOverviewDialogComponent,
    FeedComponent,
    ComplexityColorPipe,
    EnumToArrayPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LocalMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    LocalMaterialModule,
    HttpClientModule
  ],
  entryComponents: [QuestionOverviewDialogComponent],
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