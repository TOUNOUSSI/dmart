import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/authentication/auth.service';
import {User} from '../../models/user.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  errorMessage: string;
  alertsDismiss: any = [];

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {
   }

  ngOnInit() { }

  login() {
    try {
                localStorage.clear();
                this.authService.logIn(this.user).subscribe(
                    result => {},
                    (error: any) => {
                            this.errorMessage = error.status;
                            switch (error.status) {
                                case 200:
                                    this.successupdate('Vous êtes connectée', 'success');
                                    break;
                                case 400:
                                    this.errorMessage = 'Mot de passe ou identifiant incorrectes!';
                                    this.successupdate(this.errorMessage, 'danger');
                                    break;
                                case 401:
                                    this.errorMessage = 'Vous n\'avez pas le droit d\'accedé a cette ressource!';
                                    this.successupdate(this.errorMessage, 'danger');
                                    break;
                                case 404:
                                    this.errorMessage = 'Mot de passe ou identifiant incorrectes!';
                                    this.successupdate(this.errorMessage, 'danger');
                                    break;
                                case 403:
                                    this.errorMessage = 'Vous n\'avez pas le droit d\'accedé à cette ressource! Verifiez votre certificat SSL';
                                    this.successupdate(this.errorMessage, 'danger');
                                    break;
                                case 405:
                                    this.errorMessage = 'Vous n\'etes pas autoriser à acceder à cette ressource!';
                                    this.successupdate(this.errorMessage, 'danger');
                                    break;
                                case 500:
                                    this.errorMessage = 'Une erreur s\'est produit dans le serveur!';
                                    this.successupdate(this.errorMessage, 'danger');
                                    break;

                                default:
                                    this.errorMessage = 'Le serveur n\'autorise pas l\'accès!';
                                    this.successupdate(this.errorMessage, 'danger');
                                    break;
                            }
                        }

                );     
    } catch (error) {
        console.log(error)
    }


}

successupdate(message: string, type: string): void {
  this.alertsDismiss = [];
  this.alertsDismiss.push({
      type: type,
      msg: message,
      timeout: 1500
  });
}

}
