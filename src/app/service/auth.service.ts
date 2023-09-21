import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import * as moment from 'moment';
import { catchError, shareReplay, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

interface user  {
  firstName: string | null,
  lastName: string | null,
  userName: string | null ,
  email: string | null,
  password: string | null,
  account: number,
  contact: number | null,
  address: {
    street: string,
    city: string,
    state: string,
    zip: string,
  },
};

interface card {
  account : number,
  cardNumber : number,
  cvv : number,
  expDate :string,
  cardType : string,
  bank: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient, private router:Router) { }

  // register route
  register(user : user){
    return this.http.post('http://localhost:8000/register', user)
  }
  
  // login route
  proceedLogin(userName:string, password : string){
    return this.http.post('http://localhost:8000/login', {userName, password})
    .pipe(
      tap((res => this.setSession(res))),
      shareReplay()
    );
  }

  // refresh token route
  refreshToken(){
    const refreshToken = localStorage.getItem('refreshToken');
    console.log(refreshToken," is my refresh token");

    return this.http.post('http://localhost:8000/refresh', {refreshToken})
    .pipe(
      tap((res => {
        console.log("Inside auth service refresh token TAP method");
        this.setSession(res);
      })),
      catchError((error: any)=>{
        // handle refresh token error
        if(error.status === 401|| error.status === 500){
          console.log('got an error ', error.status);
          this.logout(); // clearing user session
          this.router.navigate(['/login']); // redirecting to login page
        }
        return throwError(error);
      })
    );
  }

  private setSession(authResult : any){
    console.log("authResult ", authResult);
    const expiresAt = moment().add(authResult.expiresIn, 'second');
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    localStorage.setItem("refreshToken", authResult.refreshToken);
  }

  // sucessfully working
  logout() {
    localStorage.removeItem("id_token");    
    localStorage.removeItem("expires_at");
    // localStorage.removeItem("refreshToken");
  }



  // sucessfully Working 
  profile() {
    return this.http.get('http://localhost:8000/profile')
  }

  // sucessfully working
  uploadProfileImage(image : string){
    return this.http.post('http://localhost:8000/profileUpload', {image})
    .pipe(
      shareReplay()
    )
  }

  getProfileImage(){
    return this.http.get('http://localhost:8000/profileImage')
  }

  // sucessfully Working
  deposit(amount : number){
    return this.http.post('http://localhost:8000/deposit', {amount})
    .pipe(shareReplay());
  }

  // sucessfully working
  Withdraw(amount : number, totalBalance : number){
    return this.http.post('http://localhost:8000/withdraw', {amount, totalBalance})
    .pipe(shareReplay());
  }

  // Sucessfully working
  transfer(amount : number, totalBalance : number, accNum : String){
    return this.http.post('http://localhost:8000/transfer', {amount, totalBalance, accNum})
    .pipe(shareReplay());
  }

  // sucessfully working
  transactions(){
    return this.http.get('http://localhost:8000/transactions')
    .pipe(
      tap((res => console.log(res))),
      shareReplay()
    );
  }

  // sucessfully worikig
  cards(){
    return this.http.get('http://localhost:8000/cards')
  }

  // sucessfully working
  newCard(card : card){
    return this.http.post('http://localhost:8000/newcard', {card})
    .pipe(shareReplay());
  }

  // still some errors
  deleteCard(card : card){
    return this.http.post('http://localhost:8000/deleteCard', {card})
    .pipe(shareReplay());
  }

}
