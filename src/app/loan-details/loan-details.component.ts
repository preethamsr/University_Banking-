import { emidetails } from './../emi_details';
import { account_details } from './../account_details';
import { Loan_details } from './../Loan_details';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendapiService } from './../backendapi.service';
import { filter } from 'rxjs/operators';
import { runInThisContext } from 'vm';



@Component({
  selector: 'app-loan-details',
  templateUrl: './loan-details.component.html',
  styleUrls: ['./loan-details.component.css']
})
export class LoanDetailsComponent implements OnInit {
  x: string;
  emi_date: Date;
  loan: number;
  term: number;
  emi: number;
  showloading: boolean;
  month_total_emi: number;
  total_intrest: number;
  principle_amount: number;
  principle_emi: number;
  total_pay: number;
  monthly_emi:number


  constructor(private http: HttpClient, private routes: Router, private route: ActivatedRoute, private Backend: BackendapiService) {
    this.x = this.route.snapshot.queryParamMap.get('activationcode');
  }

  loan_detais_user: Loan_details[];
  user_details: account_details[];
  emi_obj = new emidetails()
  emi_info = [
    {
      date: null,
      emi: null,
      intrest: null,
      principle_amount: null,
      balance:null
    }
  ]
  emi_intrest = [];


  ngOnInit(): void {


    this.Backend.userdetails(this.x).subscribe(x => {
      this.user_details = x;
    })
    this.Backend.loan_details(this.x).subscribe(x => {
      this.loan_detais_user = x;

      for (let i = 0; i <= this.loan_detais_user.length; i++) {
        let s = this.loan_detais_user[i]
        this.emi_date = s.Date_of_approval
        console.log(this.emi_date)
        this.term = s.Tenure;
        this.loan = s.Loan_amount
        this.monthly_emi = this.emi_calculation();
        this.total_pay = this.term * this.monthly_emi;
        this.total_intrest = this.total_pay - this.loan;
        this.principle_amount = this.loan - this.total_intrest;
        this.principle_emi = this.principle_amount / this.term;
        this.month_total_emi = this.total_intrest / this.term

        for (let j = 1; j <= this.term; j++) {
          this.total_intrest;
          this.principle_amount;
          this.total_pay;
          this.emi_date = new Date(this.emi_date);
          this.emi_date.setDate(this.emi_date.getDate() + 30)
          let temp = this.emi_calculation();
          let s = this.monthly_intrest_calculation(this.total_intrest);
          let p = this.principle_amount_emi(this.principle_amount);
          let m=this.Total_pay(this.total_pay)
          if(s<0 || p<0 || m<0)
          {
            this.emi_info.push({
              date: this.emi_date,
              emi: temp,
              intrest: 0,
              principle_amount: 0,
              balance:0
            });
          }else
          {
            this.emi_info.push({
              date: this.emi_date,
              emi: temp,
              intrest: s,
              principle_amount: p,
              balance:m
            });
          }

          console.log(this.emi_info);
          this.emi_date = this.emi_date;
        }
      }
      console.log(x)
    });
  }


  principle_amount_emi(principle_amount) {
    let monthly_principle = principle_amount - this.principle_emi;
    this.principle_amount = monthly_principle;
    return monthly_principle;
  }


  monthly_intrest_calculation(total_intrest) {

    let month_intrest_deduction = total_intrest - this.month_total_emi;
    this.total_intrest = month_intrest_deduction;
    return month_intrest_deduction;
  }

  Total_pay(total_pay) {
    let monthly_detuction = total_pay -this.monthly_emi;
     this.total_pay=monthly_detuction;
     return monthly_detuction;
  }

  emi_calculation() {
    let n = 8
    const In = (((n) / 12) / 100);
    const pow = Math.pow(1 + In, this.term);
    return this.emi = ((this.loan * In) * ((pow) / ((pow) - 1)));
  }

}
