import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

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

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  users: any[] = [];

  title = 'User Registration Form';
  data: Object = {};

  constructor(private route: Router, private authService : AuthService) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  OnInit() {}
  registerForm = new FormGroup(
    {
      firstname: new FormControl('', [
        Validators.required,
        Validators.pattern('^[^\\s].*'),
      ]),
      lastname: new FormControl('', [
        Validators.required,
        Validators.pattern('^[^\\s].*'),
      ]),
      username: new FormControl('', [
        Validators.required,
        Validators.pattern('^[^\\s].*'),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('^[^\\s].*'),
      ]),
      repassword: new FormControl('', [Validators.required]),
      contact: new FormControl('', [
        Validators.required,
        Validators.pattern('[6-9]{1}[0-9]{9}'),
      ]),
      
      address: new FormArray([this.createAddressGroup()]),
    },
    { validators: this.confirmPassword }
  );

  createAddressGroup(): FormGroup {
    return new FormGroup({
      street: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      zip: new FormControl('', [Validators.required]),
    });
  }

  get address(): FormArray {
    return this.registerForm.get('address') as FormArray;
  }

  addAddress(): void {
    const addressGroup = this.createAddressGroup();
    this.address.push(addressGroup);
  }

  removeAddress(index: number): void {
    this.address.removeAt(index);
  }

  get firstname() {
    return this.registerForm.get('firstname');
  }

  get lastname() {
    return this.registerForm.get('lastname');
  }

  get username() {
    return this.registerForm.get('username');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get repassword() {
    return this.registerForm.get('repassword');
  }

  get contact() {
    return this.registerForm.get('contact');
  }

  // get address() {
  //   return this.registerForm.get('address');
  // }

  get street() {
    return this.address.at(0).get('street');
  }

  get city() {
    return this.address.at(0).get('city');
  }

  get state() {
    return this.address.at(0).get('state');
  }

  get zip() {
    return this.address.at(0).get('zip');
  }

  confirmPassword(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('repassword');

    if (password?.value === confirmPassword?.value) {
      return null;
    } else {
      return { confirmPassword: true };
    }
  }

  get dateTime(): any {
    let timeStamp = new Date();
    let date: any = timeStamp.getDate();
    let month: any = timeStamp.getMonth();
    let year: any = timeStamp.getFullYear();
    let hours: any = timeStamp.getHours();
    let minutes: any = timeStamp.getMinutes();
    let seconds: any = timeStamp.getSeconds();

    if (Number(date) < 10) {
      date = 0 + String(date);
    }
    if (Number(month) < 10) {
      month = '0' + month;
    }
    if (Number(hours) < 10) {
      hours = '0' + hours;
    }
    if (Number(minutes) < 10) {
      minutes = '0' + minutes;
    }
    if (Number(seconds) < 10) {
      seconds = '0' + seconds;
    }
    return year + month + date + hours + minutes + seconds;
  }

  registerUser() {
    if (this.registerForm.valid) {
      // console.log(this.registerForm.value);
      const user : user = {
        firstName: this.firstname!.value,
        lastName: this.lastname!.value,
        userName: this.username!.value,
        email: this.email!.value,
        password: this.password!.value,
        account: this.dateTime,
        contact: Number(this.contact!.value),
        address: {
          street: this.street?.value,
          city: this.city?.value,
          state: this.state?.value,
          zip: this.zip?.value,
        },
      };

      // console.log('The Created object is ', user);

      this.authService.register(user)
      .subscribe((res)=>{
        console.log(res);
        if(res === "Registered Sucessfully..."){
          this.route.navigateByUrl('/login');
        }
      })
    } else {
      console.log('invalid form');
    }
  }
}
