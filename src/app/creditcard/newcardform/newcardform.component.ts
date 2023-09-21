import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-newcardform',
  templateUrl: './newcardform.component.html',
  styleUrls: ['./newcardform.component.css']
})
export class NewcardformComponent {

  @Output()
  newCardFormSubmitted = new EventEmitter();

  user : any;

  constructor(private authService : AuthService) {}

  creditCards = [{}];

  ngOnInit() {
    this.authService.profile()
    .subscribe((res)=>{
      this.user = res;
    })
  }

  newCard = new FormGroup({
    cardNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}')]),
    cvv: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}')]),
    cardType: new FormControl('', [Validators.required]),
    expDate: new FormControl('', [Validators.required]),
    bank: new FormControl('', [Validators.required]),
  });

  cardSubmit() {
    if (this.newCard.valid) {

      let card = {
        account : Number(this.user.account),
        cardNumber : Number(this.newCard.get('cardNumber')!.value),
        cvv: Number(this.newCard.get('cvv')!.value),
        cardType: String(this.newCard.get('cardType')!.value),
        expDate: String(this.newCard.get('expDate')!.value),
        bank: String(this.newCard.get('bank')!.value),
      }

      // console.log(this.user);
      // console.log(card);

      this.authService.newCard(card)
      .subscribe(async (res)=> {
        console.log(res);
        await this.newCardFormSubmitted.emit();
      })

       

    }
  }
}
