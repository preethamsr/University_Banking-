import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-emi-calculator',
  templateUrl: './emi-calculator.component.html',
  styleUrls: ['./emi-calculator.component.css']
})
export class EmiCalculatorComponent implements OnInit {
  emi_loan: number=200000;
  emi_tenure: number=60;
  emi_intrest: number=10.5;
  result: number;
  constructor() { }

  ngOnInit(): void {
    this.Emicalculation();
  }
  Emicalculation()
  {
     const ln = this.emi_loan;
     const In = (((this.emi_intrest)/12)/100);
     const tn = this.emi_tenure;
     const pow = Math.pow(1+In, tn);
     console.log(ln);
     console.log(In);
     console.log(tn);
     let emi = ((ln * In)*(((pow)/((pow)-1))))
     console.log(emi);
     if(emi!=null){
       this.result=emi
     }else{

    }
     console.log(Math.pow(1+In, tn))

  }

}
