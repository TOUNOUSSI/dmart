import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/authentication/auth.service";
import { User } from "../../models/user.model";
import { ActivatedRoute } from "@angular/router";
import { SnackbarService } from "src/app/services/notifications/toaster/snackbar.service";
import { CookieService } from "ngx-cookie-service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  user: User = new User();
  constructor(
    private authService: AuthService,
    private toasterService: SnackbarService,
    private cookieService: CookieService
  ) {}

  ngOnInit() {}

  login() {
    try {
      localStorage.clear();
      this.authService.logIn(this.user).subscribe(
        (response) => {
          console.log("USERNAME = " + JSON.stringify(response));
          if (response.authenticatedUser.error === undefined) {
            this.cookieService.set(
              "__psdnm_",
              response.authenticatedUser.pseudoname
            );
            this.cookieService.set(
              "__token_",
              response.authenticatedUser.token
            );
            this.cookieService.set(
              "__usrnm_",
              response.authenticatedUser.username
            );
            this.toasterService.message = "Welcome to DMART";
            this.toasterService.open();
          } else {
            this.toasterService.message =
              response.authenticatedUser.error.message;
            this.toasterService.open();
          }
        },
        (err: any) => {
          this.toasterService.message = err.error.error.message;
          this.toasterService.open();
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
}
