import { Input } from '@angular/core';

export interface transactiondetails
{
  Transaction_ID: number;
  Account_id: number;
  To_account: string;
  Amount: number;
  Date: Date;
  Beneficiary: string;
}
