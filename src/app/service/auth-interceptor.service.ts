import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private router:Router, private authService:AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const jwtToken = localStorage.getItem("id_token");

    if(req.url.includes('/transactions') || req.url.includes('/profile') || req.url.includes('/dashboard') 
      || req.url.includes('/deposit') || req.url.includes('/withdraw') || req.url.includes('/transfer')
      || req.url.includes('/newcard') || req.url.includes('/cards') || req.url.includes('/profileUpload')
      || req.url.includes('/profileImage') || req.url.includes('/updateCard') || req.url.includes('/deleteCard') 
      || req.url.includes('/updateProfile') && jwtToken){
      const copyToken = req.clone({
        headers : req.headers.set("Authorization", "Bearer " + jwtToken)
      });
      return next.handle(copyToken)
      .pipe(
        catchError(error => {
          if(error.status === 401 || error.status === 500){
            console.log('got an error', error.status);
            this.authService.refreshToken().subscribe(resp => {
              console.log("Response from Refrsh token ", resp);
            }, error => {
              console.log("Refresh token error ", error);
            });
            // this.authService.logout();
            // this.router.navigate(['/login']);
            
          }
          return throwError(error);
        })
      )
    }else {
      return next.handle(req);
    }
  }

  
}
