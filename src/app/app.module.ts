import { AuthGuard } from './auth.guard';
import { BackendapiService } from './backendapi.service';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { TransactionComponent } from './transaction/transaction.component';
import { LoanComponent } from './loan/loan.component';
import { LoanDetailsComponent } from './loan-details/loan-details.component';
import { LogoutComponent } from './logout/logout.component';
import { AdminComponent } from './admin/admin.component';
import { EmiCalculatorComponent } from './emi-calculator/emi-calculator.component';



const ROUTES: Routes = [
  {path: 'home', component: HomeComponent,canActivate:[AuthGuard]},
  {path: 'transactions', component: TransactionComponent,canActivate:[AuthGuard]},
  {path: 'Loan', component: LoanComponent,canActivate:[AuthGuard]},
  {path:'loan_details',component:LoanDetailsComponent,canActivate:[AuthGuard]},
  {path:'logout',component:LogoutComponent,canActivate:[AuthGuard]},
  {path:'admin',component:AdminComponent},
  {path:'emicalculator',component:EmiCalculatorComponent}

  ];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EmailVerificationComponent,
    TransactionComponent,
    LoanComponent,
    LoanDetailsComponent,
    LogoutComponent,
    AdminComponent,
    EmiCalculatorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES),
    HttpClientModule
  ],
  providers: [BackendapiService, AuthGuard,AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
