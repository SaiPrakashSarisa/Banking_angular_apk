import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-creditcard',
  templateUrl: './creditcard.component.html',
  styleUrls: ['./creditcard.component.css']
})
export class CreditcardComponent {
  user: any;
  creditCards: any[] = [];

  newCardForm: boolean = false;
  editCardForm: boolean = false;

  selectedCard: any;

  constructor(public _route: Router, private authService : AuthService) {}

  ngOnInit() {
    console.log("ngOnInit has been called");
    this.authService.cards().subscribe((cards)=>{
      console.log("hello");
      
      let userCreditCards:any[] = [...(<any>cards)];

      this.creditCards = userCreditCards.map((card: any) => {
        let card1 = String(card.cardNumber).slice(0, 4);
  
        let card2 = String(card.cardNumber).slice(4, 8);
  
        let card3 = String(card.cardNumber).slice(8, 12);
  
        let card4 = String(card.cardNumber).slice(12, 16);
  
        return { ...card, card1, card2, card3, card4 };
      });
    })

    
  }

  newCardFormSubmitted(){
    this.newCardForm = false;
    this.ngOnInit();
  }

  editCard(card: any) {
    this.selectedCard = card;
    // console.log(this.selectedCard);
    this.editCardForm = true;
  }

  updateCard(updatedCard: any) {
    console.log("event emitted on update");
    this.editCardForm = false;
    this.ngOnInit();
  }
}
