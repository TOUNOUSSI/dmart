import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnonymousGuardService } from 'src/app/services/url-permission/anonymous-auth.guard';
import { AccountService } from 'src/app/services/account/account.service';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { navItems } from '../../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css']

})
export class DefaultLayoutComponent implements OnInit {
  //public navItems: Array<any>;
  public navItems = [...navItems];

  public initNavItems: Array<any>;
  msgConfirmation: string = "Vous êtes déconnecté.";

  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;

  constructor(private accountservice: AccountService, private auth: AuthService, private router: Router, private anonymousGuardService: AnonymousGuardService) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized')
    });
    this.changes.observe(<Element>this.element, {
      attributes: true
    });

  }

  ngOnInit() {
    console.log('Default layout loaded')
    this.navItems = [
      {
        name: "Home",
        url: "home",
        icon: ""
      },
      {
        name: "Manage",
        url: "Manage",
        icon: ""
      }
    ]
  }
  doLogout() {
    if (confirm('Voulez vous vraiment vous déconnecter?')) {
      localStorage.clear();
      this.accountservice.logout();
      this.router.navigate(['/login']);
    }
  }

}
