import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AccountService } from 'src/app/services/account/account.service';
import { SnackbarService } from 'src/app/services/notifications/toaster/snackbar.service';

@Component({
  selector: 'gmart-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})

export class RegistrationComponent implements OnInit {
  @Input() regForm1: FormGroup;
  @Input() regForm2: FormGroup;
  user: User = new User();
  formSubmitted: Boolean = false

  constructor(private accountService: AccountService, private toasterService: SnackbarService) { }


  ngOnInit() {

    this.regForm1 = new FormGroup({
      firstname: new FormControl(),
      lastname: new FormControl(),
      email: new FormControl('', [Validators.pattern(/^[\w]{1,}[\w.+-]{0,}@[\w-]{2,}([.][a-zA-Z]{2,}|[.][\w-]{2,}[.][a-zA-Z]{2,})$/)]),
      phone: new FormControl('', [Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)])
    });
    this.regForm2 = new FormGroup({
      username: new FormControl('', [Validators.pattern(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/)]),
      password: new FormControl(),
      passwordconfirm: new FormControl()

    });
  }


  submitStep1() {
    this.regForm1.get('firstname').markAsTouched();
    this.regForm1.get('firstname').updateValueAndValidity();
    this.regForm1.get('lastname').markAsTouched();
    this.regForm1.get('lastname').updateValueAndValidity();
    this.regForm1.get('email').markAsTouched();
    this.regForm1.get('email').updateValueAndValidity();
  }
  submitStep2() {
    this.regForm2.get('username').markAsTouched();
    this.regForm2.get('username').updateValueAndValidity();
    this.regForm2.get('password').markAsTouched();
    this.regForm2.get('password').updateValueAndValidity();
    this.regForm2.get('passwordconfirm').markAsTouched();
    this.regForm2.get('passwordconfirm').updateValueAndValidity();
    this.formSubmitted = true;
  }

  register() {
    this.accountService.signup(this.user).then(
      res => {
        this.toasterService.message = "User '"+this.user.username+"' was successfully added!";
        this.toasterService.open();
      }).catch(
        err => {
          this.toasterService.message = err.error.error.message;
          this.toasterService.open();

        }
      )
  }



}