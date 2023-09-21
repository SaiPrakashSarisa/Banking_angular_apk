import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-withdrawform',
  templateUrl: './withdrawform.component.html',
  styleUrls: ['./withdrawform.component.css']
})
export class WithdrawformComponent {
  @Output()
  wformSubmitted = new EventEmitter();

  totalBalance: number = 0;
  userTransactions: any;
  errMessage: boolean = false;
  sucessMessage: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.transactions().subscribe( (res) => {
      console.log(res);
      this.userTransactions = res;
      this.totalBalance = this.userTransactions.length != 0 ? this.userTransactions[this.userTransactions.length-1].balance : 0;
    })
  }

  // buiding form group
  withdrawForm = new FormGroup({
    amount: new FormControl('', [Validators.required, Validators.min(101)]),
  });
  // getter method to access the value of the form controls
  get amount() {
    return Number(this.withdrawForm.get('amount')!.value);
  }

  

  withdraw() {
    this.authService.Withdraw(this.amount, this.totalBalance)
    .subscribe((res)=>{
      if(res === "withdrawn Sucessfully"){
        console.log("withdrawn Sucessfully");
        this.wformSubmitted.emit();
      }else{
        this.errMessage = true;
      }
    })
  }
}
