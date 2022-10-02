import { MeetingService } from './../meeting.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';


@Component({
  selector: 'app-add-meeting',
  templateUrl: './add-meeting.component.html',
  styleUrls: ['./add-meeting.component.css']
})
export class AddMeetingComponent implements OnInit {

  form : FormGroup;
  serviceID = 'service_p6faj4b';
  templateID = 'template_yl2fvp5';
  publicKey = 'NbGhYrMLQ06N2trp1';
  templateParams = {
    to_name: '',
    subject : '',
    dateTime:'',
    invokedEmails:'',
    duration:'',
    location:'',
    description:''
  };


  constructor(
    public meetingService : MeetingService,
    private formBuilder : FormBuilder,
    private http : HttpClient,
    private router : Router
    ) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      subject :'',
      dateTime :'',
      invokedEmails :'',
      duration:'',
      location:'',
      description:''
    })

  }

  public sendEmail() {
    this.templateParams.dateTime = this.form.getRawValue().dateTime;
    this.templateParams.subject = this.form.getRawValue().subject;
    this.templateParams.invokedEmails = this.form.getRawValue().invokedEmails;
    this.templateParams.duration = this.form.getRawValue().duration;
    this.templateParams.location = this.form.getRawValue().location;
    this.templateParams.description = this.form.getRawValue().description;
    const toEmailList = this.form.getRawValue().invokedEmails.split(';')
    for (let i = 0; i < toEmailList.length; i++){
      this.templateParams.to_name = toEmailList[i];
      console.log(toEmailList[i]);
      emailjs.send(this.serviceID, this.templateID, this.templateParams, this.publicKey);
    }

  }




  submit(){
    this.sendEmail();
    this.meetingService.addMeeting(this.form.getRawValue()).subscribe( (res) =>{
      console.log(res)
      this.router.navigate(['home']);
    })
  }

}
