import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  private feedbackRecipientEmail: string;
  
  feedbackForm: FormGroup;
  keyword = 'name';
  feedbackRecipientsMailList : any[];

  constructor(private formBuilder: FormBuilder,
              private configService: ConfigService) { }

  ngOnInit() {
    this.feedbackForm = this.formBuilder.group({
      candidateFormControl: new FormControl(''),
      departmentFormControl: new FormControl(''),
      feedbackRecipientFormControl: new FormControl(''),
      feedbackFormControl: new FormControl('')
    });

    this.feedbackRecipientsMailList = this.configService.getFeedbackRecipientsList();
  }

  selectEvent(item) {
    this.feedbackRecipientEmail = item.email;
  }

  onChangeSearch(event) {
    this.feedbackRecipientEmail = event.target.value;
  }

  getMailUri() {
    let candidateNames = this.feedbackForm.get('candidateFormControl').value;
    let department = this.feedbackForm.get('departmentFormControl').value;
    let feedback = this.feedbackForm.get('feedbackFormControl').value;

    let uri = `mailto:${this.feedbackRecipientEmail}?subject=Feedback for ${candidateNames} for ${department} department&body=${feedback}`;
    
    return uri;
  }

}
