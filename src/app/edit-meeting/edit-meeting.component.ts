import { MeetingService } from './../meeting.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-meeting',
  templateUrl: './edit-meeting.component.html',
  styleUrls: ['./edit-meeting.component.css']
})
export class EditMeetingComponent implements OnInit {

  form : FormGroup;

  constructor(private formBuilder : FormBuilder, public meetingService : MeetingService) { }

  meeting :any;
  ngOnInit(): void {
    this.meeting = history.state.data;
    console.log(history.state.data);
    this.form = this.formBuilder.group({
      subject :this.meeting.subject,
      dateTime :this.meeting.dateTime,
      invokedEmails :this.meeting.invokedEmails,
      duration:this.meeting.duration,
      location:this.meeting.location,
      description:this.meeting.description
    });

  }

  submit(){
    this.meeting.dateTime = this.form.getRawValue().dateTime;
    this.meeting.duration = this.form.getRawValue().duration;
    this.meeting.location = this.form.getRawValue().location;
    this.meeting.description = this.form.getRawValue().description;
    this.meeting.invokedEmails = this.form.getRawValue().invokedEmails;
    this.meeting.subject = this.form.getRawValue().subject;
    this.meetingService.editMeeting(this.meeting.id,this.meeting);
  }

}
