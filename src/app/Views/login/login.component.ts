import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/authentication/auth.service';
import {User} from '../../models/user.model';
import { ActivatedRoute } from '@angular/router';
import { SnackbarService } from 'src/app/services/notifications/toaster/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  constructor(private authService: AuthService, private toasterService: SnackbarService, private route: ActivatedRoute) {
   }

  ngOnInit() { }

  login() {
    try {
        
                localStorage.clear();
                this.authService.logIn(this.user).subscribe(
                    result => {
                      this.toasterService.message = "Welcome to DMART";
                      this.toasterService.open();
                    },
                    (err: any) => {
                            this.toasterService.message = err.error.error.message; 
                            this.toasterService.open();
                        }

                );     
    } catch (error) {
     
        console.log(error)
    }


}

}
