import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { NavigationComponent } from './navigation/navigation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { SavingComponent } from './saving/saving.component';
import { DepositformComponent } from './saving/depositform/depositform.component';
import { TransferformComponent } from './saving/transferform/transferform.component';
import { WithdrawformComponent } from './saving/withdrawform/withdrawform.component';
import { CreditcardComponent } from './creditcard/creditcard.component';
import { NewcardformComponent } from './creditcard/newcardform/newcardform.component';
import { EditCardFormComponent } from './creditcard/edit-card-form/edit-card-form.component';
import { CardComponent } from './card/card.component';
import { AuthInterceptorService } from './service/auth-interceptor.service';
import { AuthGuardService } from './guards.guard';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegistrationComponent,
    NavigationComponent,
    DashboardComponent,
    ProfileComponent,
    SavingComponent,
    DepositformComponent,
    TransferformComponent,
    WithdrawformComponent,
    CreditcardComponent,
    NewcardformComponent,
    EditCardFormComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass : AuthInterceptorService,
      multi : true
    },
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
