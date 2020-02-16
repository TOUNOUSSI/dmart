import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AnonymousGuardService } from 'src/app/services/url-permission/anonymous-auth.guard';
import { AccountService } from 'src/app/services/account/account.service';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { navItems } from '../../../_nav';
import { Observable } from 'rxjs';
import { FormControl, FormControlName, FormGroup, FormBuilder } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems = navItems;
  myFormGroup: FormGroup;
  searchHistory: string[] = [];
  filteredOptions: Observable<string[]>;
  users:User[] = new Array();

  ngOnInit() {
    this.myFormGroup = new FormGroup({
      search: new FormControl()
    });
    this.filteredOptions = this.myFormGroup.get('search').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }
   fromSearchHistory: string[] =new Array();

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    this.fromSearchHistory = this.searchHistory.filter(option => {
      option.toLowerCase().includes(filterValue)
    });

    if(this.fromSearchHistory.length ==0 ){
      this.accountservice.getAllAccounts().toPromise().then(
       users => {
         alert(users)
       });
    }else{
      return this.fromSearchHistory;
    }
  }
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  searchEvent(): void {
    console.log('Searched item : ' + this.myFormGroup.get('search').value);
    this.searchHistory = [this.myFormGroup.get('search').value].concat(this.searchHistory)
  }
  public initNavItems: Array<any>;
  msgConfirmation: string = "Vous êtes déconnecté.";

  private changes: MutationObserver;
  public element: HTMLElement = document.body;

  constructor(private accountservice: AccountService, private auth: AuthService, private router: Router, private fb: FormBuilder) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized')
    });
    this.changes.observe(<Element>this.element, {
      attributes: true
    });

  }


  doLogout() {
    if (confirm('Voulez vous vraiment vous déconnecter?')) {
      localStorage.clear();
      this.accountservice.logout();
      this.router.navigate(['/signin']);
    }
  }

  openDatasourceDialog() {
    console.log('Open dialog called')
  }

}
