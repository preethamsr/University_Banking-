import { BackendapiService } from './../backendapi.service';
import { account_details } from './../account_details';
import { Routes, ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validator, Validators, FormGroupDirective } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { from, observable } from 'rxjs';


interface mydata {
  obj: object;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  x: string;
  param1: string;
  showloading:boolean=true;

  loan = new FormGroup({
  income: new FormControl('', Validators.required),
  co_applicant: new FormControl('', Validators.required),
  loan_amount: new FormControl('', Validators.required),
  tenure:new FormControl('', Validators.required),
   emi: new FormControl('', Validators.required)
  });
  get income(){return this.loan.get('income')}
  get co_applicant(){return this.loan.get('co_applicant')}
  get loan_amount(){return this.loan.get('loan_amount')}
  get tenure(){return this.loan.get('tenure')}
  get emi(){return this.loan.get('emi')}

  constructor(private http: HttpClient, private routes: Router, private route: ActivatedRoute,
              private Backend: BackendapiService) {

                this.route.queryParams.subscribe(params=>{
                  this.x=params['activationcode']
                });
  }


  account: account_details[];

  ngOnInit(): void {
setTimeout(() => {
  this.Backend.userdetails(this.x).subscribe(data => {

    this.account = data;
    console.log(this.account);
    this.showloading=false;
  });
}, 3000);



  }




  // emi calculation



}
