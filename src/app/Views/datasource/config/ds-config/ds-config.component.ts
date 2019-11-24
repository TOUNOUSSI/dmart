import { Component, OnInit, Input } from '@angular/core';
import { AccountService } from 'src/app/services/account/account.service';
import { SnackbarService } from 'src/app/services/notifications/toaster/snackbar.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'dmart-ds-config',
  templateUrl: './ds-config.component.html',
  styleUrls: ['./ds-config.component.scss']
})
export class DatasourceComponent implements OnInit {

  @Input() regForm1: FormGroup;
  @Input() regForm2: FormGroup;
  user: User = new User();
  formSubmitted: Boolean = false
  selectedItem : string = 'database';

  constructor(private accountService: AccountService, private toasterService: SnackbarService) { }


  ngOnInit() {

    this.regForm1 = new FormGroup({
      database: new FormControl(),
     });
    this.regForm2 = new FormGroup({
      username: new FormControl('', [Validators.pattern(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/)]),
      password: new FormControl(),
      passwordconfirm: new FormControl()

    });
  }

  listClick(newValue) {
    console.log(newValue);
    switch (newValue) {
      case 'database':
        document.getElementById('database').className = 'active'
        document.getElementById('file').className = 'custombutton'

        break;
    
      default:
          document.getElementById('file').className = 'active'
          document.getElementById('database').className = 'custombutton'

        break;
    }

   
     
    
}
  submitStep1() {
    this.regForm1.get('database').markAsTouched();
    this.regForm1.get('database').updateValueAndValidity();
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
