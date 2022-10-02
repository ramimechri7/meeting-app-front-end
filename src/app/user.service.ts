import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

constructor(private http : HttpClient) { }


getAllUsers() {
  return this.http.get("http://localhost:9000/user/all");
}

editUser(id : string, user:any){
  return this.http.post("http://localhost:9000/user/edit/"+id,user);
}

deleteUser(id:string){
  return this.http.delete("http://localhost:9000/user/delete/"+id);
}


}
