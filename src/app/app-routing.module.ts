import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { SavingComponent } from './saving/saving.component';
import { CreditcardComponent } from './creditcard/creditcard.component';
import { AuthGuardService } from './guards.guard';
import { PageNotFoundComponent } from './401.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'user/dashboard', component: DashboardComponent, canActivate : [AuthGuardService] },
  { path: 'user/profile', component: ProfileComponent, canActivate : [AuthGuardService] },
  { path: 'user/usersavings', component: SavingComponent, canActivate : [AuthGuardService] },
  { path: 'user/creditcards', component: CreditcardComponent, canActivate : [AuthGuardService] },
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
