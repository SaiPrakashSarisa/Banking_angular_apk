import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';


interface user {
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  account: string;
  contact: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  userName: string;
}

@Component({
  selector: 'app-transferform',
  templateUrl: './transferform.component.html',
  styleUrls: ['./transferform.component.css']
})
export class TransferformComponent {

  @Output()
  transfered = new EventEmitter();

  user!: user;
  totalBalance: number = 0;
  allTransactions: any;
  userTransactions: any;
  errAccount: boolean = false;
  errMessage: boolean = false;

  constructor(private authService:AuthService) {}

  ngOnInit() {
    this.authService.transactions().subscribe( (res) => {
      console.log(res);
      this.userTransactions = res;
      this.totalBalance = this.userTransactions.length != 0 ? this.userTransactions[this.userTransactions.length-1].balance : 0;
    })
  }

  transferForm = new FormGroup({
    amount: new FormControl('', [Validators.required]),
    taccount: new FormControl('', [
      Validators.required,
      Validators.maxLength(14),
    ]),
  });

  // methods to get form data values.
  get amount() {
    return Number(this.transferForm.get('amount')!.value);
  }

  get account() {
    return this.transferForm.get('taccount')!.value;
  }

  transfer() {
  
    //     this.transfered.emit();
    this.authService.transfer(this.amount, this.totalBalance, this.account!)
    .subscribe((res)=>{
      if(res === "No Funds") {
        this.errMessage = true;
      }else if(res === "No User"){
        this.errAccount = true;
      }else{
        console.log(res);
        this.errAccount = false;
        this.errMessage = false;
        this.transfered.emit();

      }
    })
    
  }
}
