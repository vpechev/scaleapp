import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ConfigService } from '../services/config.service';
import { InterviewQuestionsService } from '../services/interview-questions.service';
import { MatDialog } from '@angular/material/dialog';
import { FeedbackReviewDialogComponent } from '../feedback-review-dialog/feedback-review-dialog.component';
import { faEye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  private feedbackRecipientEmail: string;
  private shouldHire: boolean;
  
  faEye = faEye;
  feedbackForm: FormGroup;
  keyword = 'name';
  feedbackRecipientsMailList : any[];
  
  constructor(private formBuilder: FormBuilder,
              public dialog: MatDialog,
              private configService: ConfigService,
              private interviewQuestionsService: InterviewQuestionsService) { }

  ngOnInit() {
    this.feedbackForm = this.formBuilder.group({
      candidateFormControl: new FormControl(''),
      departmentFormControl: new FormControl(''),
      feedbackRecipientFormControl: new FormControl(''),
      feedbackFormControl: new FormControl('')
    });
    this.shouldHire = false;
    this.feedbackRecipientsMailList = this.configService.getFeedbackRecipientsList();
  }

  toggleHireSelection() {
    this.shouldHire = !this.shouldHire;
  }

  selectEvent(item) {
    this.feedbackRecipientEmail = item.email;
  }

  onChangeSearch(event) {
    this.feedbackRecipientEmail = event.target.value;
  }

  openReviewDialog() {
    this.dialog.open(FeedbackReviewDialogComponent, {
      width: '500px',
      data: {
        candidateNames : this.feedbackForm.get('candidateFormControl').value,
        department : this.feedbackForm.get('departmentFormControl').value,
        feedback : this.feedbackForm.get('feedbackFormControl').value,
        shouldHire: this.shouldHire, 
        answeredQuestions: this.interviewQuestionsService.getAnsweredQuestions(),
        notAnsweredQuestions: this.interviewQuestionsService.getNotAnsweredQuestions(),
        feedbackRecipientEmail: this.feedbackRecipientEmail
      }
    });
  }

  getMailUri() {
    if(!!this.feedbackRecipientEmail && !!this.feedbackForm.get('feedbackFormControl').value) {
      let candidateNames = this.feedbackForm.get('candidateFormControl').value;
      let department = this.feedbackForm.get('departmentFormControl').value;
      let feedbackRecipientName = this.feedbackRecipientsMailList.find(x=> x.email === this.feedbackRecipientEmail)['name'].split(' ')[0];
      let feedback = "";

      feedback += `Hey ${feedbackRecipientName},%0D%0Ain the lines below you will find the feedback from today's interview with ${candidateNames}.`;
      feedback += '%0D%0A';
      feedback += this.feedbackForm.get('feedbackFormControl').value;
      feedback += '%0D%0A';
      feedback += 'Hire recommendation: ' + this.shouldHire ? 'Hire' : 'No hire';
      feedback += '%0D%0A';
      feedback += 'Additional information';
      feedback += '%0D%0A';
      feedback += '%0D%0A';
      feedback += 'Answered questions%0D%0A';
      feedback += this.interviewQuestionsService.getAnsweredQuestions().map(x=> " - " + x.question).join("%0D%0A");
      feedback += '%0D%0A';
      feedback += '%0D%0A';
      feedback += 'Not Answered questions%0D%0A';
      feedback += this.interviewQuestionsService.getNotAnsweredQuestions().map(x=> " - " + x.question).join("%0D%0A");

      let uri = `mailto:${this.feedbackRecipientEmail}?subject=Feedback for ${candidateNames} for ${department} department&body=${feedback}`;
      
      return uri;
    }
  }

}
