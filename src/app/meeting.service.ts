import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

constructor(public http : HttpClient) { }

getMeeting(id:string){
  return this.http.get("http://localhost:9000/meeting/"+id);
}

getAllMeetings(){
  return this.http.get("http://localhost:9000/meeting/all");
}

addMeeting(meeting : any){
  return this.http.post("http://localhost:9000/meeting/create",meeting);
}

deleteMeeting(id:string){
  return this.http.delete("http://localhost:9000/meeting/delete/"+id);
}

editMeeting(id:string,meeting : any){
  return this.http.post("http://localhost:9000/meeting/edit/"+id,meeting);
}

}
