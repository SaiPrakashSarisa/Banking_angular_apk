import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  users: any[] = [];

  currentUser: any = {};

  errorMessage: boolean = false;

  loginForm = new FormGroup({
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
  });

  constructor(private route: Router, private authService : AuthService) {}
  ngOnInit() {}

  get username() {
    return this.loginForm.get('username')!.value;
  }

  get password() {
    return this.loginForm.get('password')!.value;
  }

  login() {
    if(this.loginForm.valid){

      this.authService.proceedLogin(this.username!, this.password!)
        .subscribe((response : any) => {
          console.log("user is logged in");
          this.route.navigateByUrl('user/dashboard');
        });
    }
  }
}
