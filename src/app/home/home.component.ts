import { DetailsComponent } from './../details/details.component';
import { MeetingService } from './../meeting.service';
import { Component, Input,EventEmitter ,OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  meetingList : any;

 meeting = '';
 username = '';

  constructor( public meetingService : MeetingService ,public router : Router) { }



  ngOnInit(): void {
    this.meetingService.getAllMeetings().subscribe( (resp) =>{
      console.log(resp);
      this.meetingList = resp;
      const helper = new JwtHelperService();
       this.username = helper.decodeToken(localStorage.getItem('authToken')+"").sub;
       console.log(this.username)
    })

  }

seeMore(meeting :any){
    this.meeting = meeting;
   this.router.navigate(['/details'], {state : {data: this.meeting}});
}

DeleteMeeting(id : string){
  this.meetingService.deleteMeeting(id).subscribe((res) => {
    console.log(res);
    location.reload();
  });
}




}
