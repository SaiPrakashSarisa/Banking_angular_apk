import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  user: any = {};

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.profile()
    .subscribe((res)=>{
      
      this.user = res;
    })
  }

  logout(){
    this.authService.logout();
  }
}
