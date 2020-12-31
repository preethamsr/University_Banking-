import { BackendapiService } from './backendapi.service';
import { account_details } from './account_details';
import { NavigationExtras, Routes } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {


  title = 'Bankingproject';
  activationcode: string;
  user_name: string;
  user_password: string;
  user_email: string;
  user_dob: Date;
  user_account_type: string;
  message: string;
  login_username: string;
  login_password: string;
  login_error_message: string;
  x: string;

  login = new FormGroup({
    user: new FormControl('', Validators.required),
    pass: new FormControl('', Validators.required)
  });
  create = new FormGroup({
    name: new FormControl('', Validators.required),
    pass1: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
    email: new FormControl('', Validators.email),
    birth_date: new FormControl('', Validators.required),
    account_type: new FormControl('', Validators.required)
  });
  get name() { return this.create.get('name'); }
  get email() { return this.create.get('email'); }
  get pass1() { return this.create.get('pass1'); }
  get birth_date() { return this.create.get('birth_date'); }
  get account_type() { return this.create.get('account_type'); }
  get user() { return this.login.get('user'); }
  get pass() { return this.login.get('pass'); }


  constructor(private http: HttpClient, private routes: Router, private route: ActivatedRoute,private backend:BackendapiService){}

  ngOnInit(): void {


  }
  Register() {

    this.http.post<any>('http://127.0.0.1:8080/api/Home/post', {
      Name: this.user_name,
      Password: this.user_password,
      DOB: this.user_dob,
      Email_address: this.user_email,
      Account_type: this.user_account_type
    }, { observe: 'response' }).subscribe(response => {
      if (response.status === 201) {
        this.message = 'Link successfully sent to email';
      } else if (response.status === 200) {
        this.message = 'Email already registered';
      }
    });

  }
  Login(): boolean {

    this.http.post<any>('http://127.0.0.1:8080/api/Home/login', {
      Email_address: this.login_username,
      Password: this.login_password
    }, { observe: 'response' }).subscribe(response => {
      console.log(response.body);
      if (response.status == 200) {
        localStorage.setItem('username',this.login_username)
        let temp=response.body
        console.log(temp)
        const navigationExtras: NavigationExtras = {
          queryParams: {
            activationcode: temp
          }
        };
          this.x = response.body;
          console.log(this.x);
          this.routes.navigate(['home'],navigationExtras);
          return true;





      } else if (response.status == 204) {
        this.login_error_message = 'Invalid username or password';
        return false;
      }
    });

    return false;
  }


  }


