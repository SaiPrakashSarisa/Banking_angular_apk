import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-saving',
  templateUrl: './saving.component.html',
  styleUrls: ['./saving.component.css']
})
export class SavingComponent {
  user: any;
  transactions: any;
  
  userTransactions: any;
  totalBalance : number = 0;

  showDepositform: boolean = false;
  showWithdrawform: boolean = false;
  showTransferform: boolean = false;

  constructor(private authService: AuthService, private route:Router) {}

  ngOnInit() {

    this.authService.transactions().subscribe( (res) => {
      console.log(res);
      this.userTransactions = res;
      this.totalBalance = this.userTransactions.length != 0 ? this.userTransactions[this.userTransactions.length-1].balance : 0;
    })

  }

  dformSubmit() {
    this.showDepositform = false;
    this.ngOnInit();
  }

  wformSubmit() {
    this.showWithdrawform = false;
    this.ngOnInit();
  }
  tformSubmit() {
    this.showTransferform = false;
    this.ngOnInit();
  }
}
