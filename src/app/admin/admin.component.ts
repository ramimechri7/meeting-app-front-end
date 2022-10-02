import { MeetingService } from './../meeting.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  userList :any;
  showeditUser = false;
  userToEdit :any;
  formUser : FormGroup;
  formMeeting: FormGroup;
  showMeetings = false;


  meetingList:any;
  MeetingToEdit:any;
  showeditMeeting=false;


  serviceID = 'service_p6faj4b';
  templateID = 'template_88jopaz';
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




  constructor(public userService : UserService, public formBuilder : FormBuilder,public meetingService : MeetingService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((res) =>{
      this.userList = res;
      console.log(res);
    })
    this.meetingService.getAllMeetings().subscribe((res)=>{
      this.meetingList = res;
      console.log(res);
        })
  }


  public sendEmail() {
    this.templateParams.dateTime = this.formMeeting.getRawValue().dateTime;
    this.templateParams.subject = this.formMeeting.getRawValue().subject;
    this.templateParams.invokedEmails = this.formMeeting.getRawValue().invokedEmails;
    this.templateParams.duration = this.formMeeting.getRawValue().duration;
    this.templateParams.location = this.formMeeting.getRawValue().location;
    this.templateParams.description = this.formMeeting.getRawValue().description;
    const toEmailList = this.formMeeting.getRawValue().invokedEmails.split(';')
    for (let i = 0; i < toEmailList.length; i++){
      this.templateParams.to_name = toEmailList[i];
      console.log(toEmailList[i]);
      emailjs.send(this.serviceID, this.templateID, this.templateParams, this.publicKey);
    }

  }

  editUser(user:any){
    this.userToEdit = user;
    this.showeditUser = true;
    this.formUser = this.formBuilder.group({
      username:user.username,
      email:user.email
    })
  }

  cancelEditUser(){
    this.showeditUser = false;
  }

  editMyUser(){
    this.userToEdit.username = this.formUser.getRawValue().username;
    this.userToEdit.email = this.formUser.getRawValue().email;
    this.userService.editUser(this.userToEdit.id,this.userToEdit).subscribe((res) =>{
      this.showeditUser = false;
      this.userService.getAllUsers();
    })
  }

  deleteUser(id :string){
    this.userService.deleteUser(id).subscribe((res)=>{
      location.reload();
        })
  }

  editMeeting(meeting:any){
    this.MeetingToEdit = meeting;
    this.showeditMeeting = true;
    this.formMeeting = this.formBuilder.group({
      subject : meeting.subject,
      dateTime : meeting.dateTime,
      invokedEmails :meeting.invokedEmails,
      duration: meeting.duration,
      location: meeting.location,
      description: meeting.description
    })
  }

  cancelEditMeeting(){
    this.showeditMeeting = false;
  }

  editMyMeeting(){
    this.MeetingToEdit.subject = this.formMeeting.getRawValue().subject;
    this.MeetingToEdit.dateTime = this.formMeeting.getRawValue().dateTime;
    this.MeetingToEdit.invokedEmails = this.formMeeting.getRawValue().invokedEmails;
    this.MeetingToEdit.duration = this.formMeeting.getRawValue().duration;
    this.MeetingToEdit.location = this.formMeeting.getRawValue().location;
    this.MeetingToEdit.description = this.formMeeting.getRawValue().description;
    this.meetingService.editMeeting(this.MeetingToEdit.id,this.MeetingToEdit).subscribe((res)=>{
      this.showeditMeeting = false;
    })
    console.log(this.templateParams);
    this.sendEmail();
  }


  deleteMeeting(id : string){
    this.meetingService.deleteMeeting(id).subscribe(()=>{
      location.reload();
    })
  }

}

