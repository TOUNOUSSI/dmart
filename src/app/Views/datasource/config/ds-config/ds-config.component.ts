import { Component, OnInit, Input } from '@angular/core';
import { AccountService } from 'src/app/services/account/account.service';
import { SnackbarService } from 'src/app/services/notifications/toaster/snackbar.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { Datasource } from 'src/app/models/datasource.model';
import { DsService } from 'src/app/services/ds/ds.service';

@Component({
  selector: 'dmart-ds-config',
  templateUrl: './ds-config.component.html',
  styleUrls: ['./ds-config.component.scss']
})
export class DatasourceComponent implements OnInit {

  @Input() regForm1: FormGroup;
  @Input() regForm2: FormGroup;
  datasource: Datasource = new Datasource();
  formSubmitted: Boolean = false
  selectedItem : string = 'database';

  constructor(private datasourceService: DsService, private toasterService: SnackbarService,private formBuilder: FormBuilder) { }

 
  ngOnInit() {
    this.regForm1 =  this.formBuilder.group({
      database: new FormControl(),
     });
    this.regForm2  =  this.formBuilder.group({
      url : new FormControl(),
      username: new FormControl('', [Validators.pattern(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/)]),
      password: new FormControl(),
      port: new FormControl()

    });

    this.regForm2.patchValue({
      url: 'Nancy',
      username:'Nancy',
      password: 'Nancy',
      port : 'Nancy'
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

  testConnection() {
    this.datasourceService.testConnection(this.datasource).then(
      res => {
        console.log('is WS test has been passed ? =>  '+ res)
        this.toasterService.message = "Datasource '"+this.datasource.username+"' was successfully connected!";
        this.toasterService.open();
      }).catch(
        err => {
          this.toasterService.message = err.error.error.message;
          this.toasterService.open();

        }
      )
  }

  private onDatasourceFormValueChange(data) {
    this.datasource.url = data.url
    this.datasource.username = data.username
    this.datasource.password = data.password
    this.datasource.port = data.port
}

}
