import { transaction_account_modey_send } from './../transaction_account_modey_send';
import { logging } from 'protractor';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { transactiondetails } from './../transactiondetails';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { account_details } from './../account_details';
import { BackendapiService } from './../backendapi.service';
import{account_number_suggestion} from './../transaction_account_modey_send';


@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  x: any;
  showloading:boolean=true;
  hide:boolean=false
  activationcode: string;
  Example: string;
  message: string;
  Transaction = new FormGroup({
  account_number: new FormControl('', Validators.required),
  account_name: new FormControl('', Validators.required),
  amount: new FormControl('',Validators.required)
  });


  constructor(private http: HttpClient, private routes: Router, private route: ActivatedRoute,private Backend: BackendapiService) {
    this.x = this.route.snapshot.queryParamMap.get('activationcode');


    console.log(this.x);
  }
  account: account_details[];
  transaction: transactiondetails[];
  a_n_s: account_number_suggestion[];



  t_a_m:transaction_account_modey_send={
  To_account:null,
  Amount:null,
  Beneficiary:null,
  }

  ngOnInit(): void {

setTimeout(() => {
  this.Backend.userdetails(this.x).subscribe(data => {
    this.account = data;
    console.log(this.account);
  });
  this.Backend.Transaction_details(this.x).subscribe(data => {
    this.transaction = data;
    console.log(this.transaction);
  });
  this.showloading=false;
}, 3000);



  }
  selctvalue(value){
this.Transaction.patchValue({"account_number":value});
this.hide=false;
  }
toggledropdown(){
  this.hide=!this.hide
}
  account_details()
  {
    this.Backend.Account_number_serach(this.t_a_m.To_account).subscribe(x=>{
      this.Backend.Accountnumberserach(this.t_a_m.To_account).subscribe(data=>{
          if(data.status==202)
          {
            this.message=""
            this.a_n_s=x
            console.log(this.a_n_s)
            let temp=this.t_a_m.To_account
             for(let i=0;i<=this.a_n_s.length;i++)
             {
               let s=this.a_n_s[i]

             }

          }
          else if(data.status==200)
          {
            if(this.t_a_m.To_account==null){

            }else{
            // this.message="Not Found"
            }

          }
      })
    })
  }

  send()
  {

    this.http.post<any>('http://127.0.0.1:8080/api/transaction/moneytransaction?data=' +this.x, {
    To_account: this.t_a_m.To_account,
    Amount: this.t_a_m.Amount,
    Beneficiary: this.t_a_m.Beneficiary,

    }, {observe: 'response'}).subscribe( data =>{
     console.log(data.status);
     if(data.status == 202)
     {
        this.message = 'Successfully sent';
     }
     else if(data.status == 204)
     {
       this.message = 'No balance';
     }

});
  }


}
