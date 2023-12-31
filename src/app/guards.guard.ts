import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';


@Injectable()
export class AuthGuardService implements CanActivate {
  
  constructor(private router:Router) {}

  canActivate(): boolean {
    
    if(!localStorage.getItem("id_token")){
      this.router.navigate(['/login']);
      return false;
    }else{
      return true;
    }
    
  }
  
}


