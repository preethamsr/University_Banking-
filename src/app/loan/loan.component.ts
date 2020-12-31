import { Loan } from './../loan';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { transactiondetails } from './../transactiondetails';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { account_details } from './../account_details';
import { BackendapiService } from './../backendapi.service';


@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnInit {
 x: string;
 calculation_income = 2000;
 calculation_otheremi = 300;
 calculation_loan = 10000;
 calculation_intrest = 5;
 calculation_tenure = 60;
 balance: number;
 message: string;
 message1: string;
 months: string;
 years: string;


 loan = new FormGroup({
  applicant_income: new FormControl('', Validators.pattern('[0-9]+')),
  co_applicatnt_income: new FormControl('', Validators.pattern('[0-9]+')),
  age1: new FormControl('', [Validators.pattern('[0-9]+'), agechecking]),
  loan_amount: new FormControl('', [Validators.pattern('[0-9]+')]),
  tenure: new FormControl('', Validators.pattern('[0-9]+')),
  other_emi: new FormControl('', Validators.pattern('[0-9]+'))


 });
 get applicant_income(){return this.loan.get('applicant_income'); }
 get co_applicatnt_income(){return this.loan.get('co_applicatnt_income'); }
 get age1(){return this.loan.get('age'); }
 get loan_amount(){ return this.loan.get('loan_amount'); }
 get tenure() { return this.loan.get('tenure'); }
 get other_emi(){return this.loan.get('other_emi'); }

  constructor(private http: HttpClient, private routes: Router, private route: ActivatedRoute, private Backend: BackendapiService) {
    this.x = this.route.snapshot.queryParamMap.get('activationcode');
   }
  account: account_details[];
    ln: Loan = {
    Applicatn_Income: null,
    co_applicant_income: null,
    other_emi: null,
    age: null,
    loan_amount: null,
    tenure: null,
    status: null,
    education: null,
    employment: null,
    dependent: null,
    area: null,
    gender: null,
    credit_history:1.0
  };

  ngOnInit(): void {


     this.Backend.userdetails(this.x).subscribe(data => {
       this.account = data;
       this.loan_eligibility();
     });
  }

  // tslint:disable-next-line: typedef
  loan_eligibility(){
    const Income_monthly = this.co_applicatnt_income;
    const otheemi = this.calculation_otheremi;
    const loan = this.calculation_loan;
    const tenure = this.calculation_tenure;
    const intrest = this.calculation_intrest;
    const In = (((this.calculation_intrest) / 12) / 100);
    console.log(loan);
    console.log(tenure);
    console.log(In);
    const pow = Math.pow(1 + In, tenure);
    const emi = ((loan * In) * ((pow) / ((pow) - 1)));
    this.balance = this.calculation_income - this.calculation_otheremi;
    if (this.balance >= emi)
     {
         this.message = 'Eligible';
     }
     else
     {
       this.message = 'Not Eligible';
     }

    console.log(emi);


  }
  // tslint:disable-next-line: typedef
  Loan_submit(){
    this.http.post<any>('http://127.0.0.1:8080/api/Loan/Loansubmit?activationcode=' + this.x, {
      Income: this.ln.Applicatn_Income,
      Co_applicant_income : this.ln.co_applicant_income,
      age: this.ln.age,
      Loan_amount: this.ln.loan_amount,
      Other_emi: this.ln.other_emi,
      Tenure: this.ln.tenure,
      Status: this.ln.status,
      Marital_status: this.ln.status,
      Education : this.ln.education,
      Dependents: this.ln.dependent,
      Employment: this.ln.employment,
      Area: this.ln.area,
      Gender:this.ln.gender,
      Credit_History:this.ln.credit_history
    }, {observe: 'response'}).subscribe(data => {
      if (data.status === 202)
      {
        this.message1 = 'Successfully Approved, Balance Updated';
      }
      else if (data.status === 404)
      {
        this.message1 = 'Failed to Approve Our team will review your application';
      }

    });
  }
  }
function agechecking(control: AbstractControl): { [key: string]: any}|null {
    const age: number = control.value;
    const age1: string = control.value;
    if (age1 === '')
    {
      return null;
    }else if (age < 18)
    {
      return {notvalidage: true};
    }
  }
