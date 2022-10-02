import { Router } from '@angular/router';
import { MeetingService } from './../meeting.service';
import { Component, Input, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  meeting :any;
  userIsCreator : boolean = false;
  attendeesNumber = 0;


  constructor(public meetingService: MeetingService, private router : Router) { }


  ngOnInit(): void {
    this.meeting = history.state.data;
    console.log(this.meeting);
    const helper = new JwtHelperService();
    const username = helper.decodeToken(localStorage.getItem('authToken')+"");
    this.userIsCreator = this.meeting.creator == username.sub;
    this.attendeesNumber = this.meeting.invokedEmails.split(';').length;
    console.log(this.userIsCreator);

  }


  DeleteMeeting(id : string){
    this.meetingService.deleteMeeting(id).subscribe((res) =>{
      this.router.navigate(['home']);
    })
  }

  EditMeeting(){
    this.router.navigate(['/edit-meeting'], {state : {data: this.meeting}});  }




}
