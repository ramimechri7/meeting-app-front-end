import { Router } from '@angular/router';
import { AuthServiceService } from './../auth-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private authService : AuthServiceService, private router : Router) { }

  ngOnInit(): void {
  }

  logout(){
    localStorage.removeItem('authToken');
    location.reload();
  }


}
