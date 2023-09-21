import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-depositform',
  templateUrl: './depositform.component.html',
  styleUrls: ['./depositform.component.css']
})
export class DepositformComponent {
  @Output()
  dformSubmitted = new EventEmitter();

  user: any;
  transactions: any;
  errMessage: boolean = false;
  sucessMessage: boolean = false;

  depositForm = new FormGroup({
    amount: new FormControl('', [Validators.required, Validators.min(101)]),
  });
  constructor(private authService: AuthService) {}

  ngOnInit() {
    
  }

  get amount() {
    return Number(this.depositForm.get('amount')!.value);
  }

  deposit() {
    this.authService.deposit(this.amount)
    .subscribe(()=>{
      console.log("submited");
      this.dformSubmitted.emit();
    })
  }
}
