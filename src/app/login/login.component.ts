import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from '../auth-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  form : FormGroup;


  constructor(
    private formBuilder : FormBuilder,
    private router : Router,
    private authService: AuthServiceService
    ) { }




  ngOnInit(): void {

    this.form = this.formBuilder.group({
      username : '',
      password : ''
    });
  }

  submit(): void {
    this.authService.login(this.form.get('username')?.value,this.form.get('password')?.value)
    } ;

    goToRegister(){
      this.router.navigate(['register']);
    }
  }



