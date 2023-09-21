import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  user: any = {};

  constructor(private authService : AuthService) {}

  ngOnInit() {
    const user = localStorage.getItem('currentUser');

    this.user = user ? JSON.parse(user) : {};
  }
}
