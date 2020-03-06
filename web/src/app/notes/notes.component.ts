import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  feedbackForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.feedbackForm = this.formBuilder.group({
      candidateFormControl: new FormControl(''),
      departmentFormControl: new FormControl(''),
      feedbackRecipientFormControl: new FormControl(''),
      feedbackFormControl: new FormControl('')
    });
  }

  getMailUri() {
    let candidateNames = this.feedbackForm.get('candidateFormControl').value;
    let department = this.feedbackForm.get('departmentFormControl').value;
    let feedbackRecipient = this.feedbackForm.get('feedbackRecipientFormControl').value;
    let feedback = this.feedbackForm.get('feedbackFormControl').value;

    let uri = `mailto:${feedbackRecipient}?subject=Feedback for ${candidateNames} for ${department} department&body=${feedback}`;
    
    return uri;
  }

}
