import { Component, Input } from '@angular/core';
import { AuthService } from '../service/auth.service';

interface CreditCard {
  cardNumber: number;
  bank: string;
  card1: number;
  card2: number;
  card3: number;
  card4: number;
  expDate: string;
  cardType: string;
  card: string;
  cvv: number;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input()
  creditCard!: CreditCard;

  user: any;

  imageUrl = 'assets/chip.png';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.profile().subscribe((res)=>{
      this.user = res;
    })
  }

  hologram: string =
    'https://images.rawpixel.com/image_400/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcGQ0My01LTA5LWV5ZS0wMS5qcGc.jpg';

  chip: string =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEi80leq5fQjfTgdUpnJeFqiORrFjg7oUXzw&usqp=CAU';

  banksLogos = [
    {
      bankName: 'SBI',
      logo: 'https://www.freepnglogos.com/uploads/sbi-logo-png/image-sbi-logo-logopedia-fandom-powered-wikia-0.png',
    },
    {
      bankName: 'ICICI',
      logo: 'https://companieslogo.com/img/orig/IBN_BIG-9ec25662.png?t=1648383607',
    },
    {
      bankName: 'HDFC',
      logo: 'https://logodix.com/logo/840255.png',
    },
  ];

  cardsTypeLogos = [
    {
      cardName: 'VISA',
      logo: 'https://www.freepnglogos.com/uploads/visa-card-logo-9.png',
    },
    {
      cardName: 'Rupay',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Rupay-Logo.png/800px-Rupay-Logo.png?20200811062726',
    },
    {
      cardName: 'Master',
      logo: 'https://www.mastercard.com/news/media/b5zamlev/mc_symbol_white.png?anchor=center&mode=crop&width=960&rnd=132530899096970000',
    },
  ];

  // method to get the bank logo accourding to the bank name
  getBankLogo(bankName: string): any {
    let logo: string | undefined;
    this.banksLogos.forEach((bankLogo) => {
      if (bankLogo.bankName === bankName) {
        logo = bankLogo.logo;
      }
    });
    return logo;
  }

  // method to get the card logo
  getCardLogo(cardType: string): any {
    let logo: string | undefined;
    this.cardsTypeLogos.forEach((card) => {
      if (card.cardName === cardType) {
        logo = card.logo;
      }
    });
    return logo;
  }
}
