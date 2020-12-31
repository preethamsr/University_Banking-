import { Loan_details } from './Loan_details';
import { Loan } from './loan';
import { transactiondetails } from './transactiondetails';
import { account_details } from './account_details';
import { HttpClientModule, HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import{account_number_suggestion} from './transaction_account_modey_send';







@Injectable({
  providedIn: 'root'
})
export class BackendapiService {

  activationcode: string;

  constructor(private http: HttpClient) { }
  userdetails(activation_code): Observable<account_details[]> {
    const httpheaders = new HttpHeaders({
      'content-type': 'application/json'
    });

    return this.http.get<account_details[]>('http://127.0.0.1:8080/api/Home/account_details?activationcode=' + activation_code,
     { headers: httpheaders });


  }

  Transaction_details(data):Observable<transactiondetails[]>
  {
    const httpheaders = new HttpHeaders({
      'content-type': 'application/json'
    });
    return this.http.get<transactiondetails[]>('http://127.0.0.1:8080/api/transaction/transactiondetails?activationcode='
    + data, {headers: httpheaders});
  }
loan_details(data):Observable<Loan_details[]>
{
  const httpheaders=new HttpHeaders({
    'content-type':'application/json'
  });
  return this.http.get<Loan_details[]>('http://127.0.0.1:8080/api/Loan/loan_detail?activationcode='
  +data,{headers:httpheaders});
}
Account_number_serach(data):Observable<account_number_suggestion[]>
{
  const httpheaders=new HttpHeaders({
    'content-type':'application/json'
  })
  return this.http.get<account_number_suggestion[]>('http://127.0.0.1:8080/api/transaction/Account_number_search?account_number='+data,
  {headers:httpheaders});
}
Accountnumberserach(data)
{
  const httpheaders=new HttpHeaders({
    'content-type':'application/json'
  })
  return this.http.get('http://127.0.0.1:8080/api/transaction/Account_number_search?account_number='+data,
  {headers:httpheaders,observe:'response'});
}
}
