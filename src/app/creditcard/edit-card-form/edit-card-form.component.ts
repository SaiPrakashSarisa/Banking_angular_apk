import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-edit-card-form',
  templateUrl: './edit-card-form.component.html',
  styleUrls: ['./edit-card-form.component.css']
})
export class EditCardFormComponent {
  @Input()
  cardData: any;

  @Output()
  editedCard = new EventEmitter();

  user: any;
  constructor(private authService:AuthService) {}

  editFormGroup!: FormGroup;

  ngOnInit() {
    // getting all the data of the current logged user
    let userData = localStorage.getItem('currentUser');
    this.user = userData ? JSON.parse(userData) : {};

    console.log(this.cardData);
    this.editFormGroup = new FormGroup({
      cardNumber: new FormControl(''),
      cvv: new FormControl(''),
      cardType: new FormControl(''),
      expDate: new FormControl(''),
      bank: new FormControl(''),
    });
  }

  editCard() {
    console.log(this.editFormGroup.value);

    const editCard = {
      account: this.user.account,
      cardNumber: this.editFormGroup.get('cardNumber')!.value,
      cvv: this.editFormGroup.get('cvv')!.value,
      cardType: this.editFormGroup.get('cardType')!.value,
      expDate: this.editFormGroup.get('expDate')!.value,
      bank: this.editFormGroup.get('bank')!.value,
    };

    this.editedCard.emit(editCard);
  }

  deleteCard(){
    if(this.editFormGroup.valid){
      const deleteCard = {
        account: this.user.account,
        cardNumber: this.editFormGroup.get('cardNumber')!.value,
        cvv: this.editFormGroup.get('cvv')!.value,
        cardType: this.editFormGroup.get('cardType')!.value,
        expDate: this.editFormGroup.get('expDate')!.value,
        bank: this.editFormGroup.get('bank')!.value,
      };

      this.authService.deleteCard(deleteCard)
      .subscribe( async (res)=>{
        console.log("card is deleted");
        await this.editedCard.emit();
      })

      
    }
  }
}
