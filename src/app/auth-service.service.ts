import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn = this._isLoggedIn.asObservable();
  private readonly TOKEN_NAME = "authToken";

  get token(){
    return localStorage.getItem(this.TOKEN_NAME);
  }

  constructor(private http : HttpClient,private router : Router) {
    this._isLoggedIn.next(!!this.token);

  }

  login(username:string, password:string){

    try{
      this.http.post("http://localhost:9000/authenticate",{username,password},{withCredentials:true, responseType: 'text'}).subscribe((res) =>{
      console.log(res)
      this._isLoggedIn.next(true);
      localStorage.setItem(this.TOKEN_NAME,res);
      this.router.navigate(['home']);
    });
    }catch(e) {
      console.log(e);
    }


  }


}
