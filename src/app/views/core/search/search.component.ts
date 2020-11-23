import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { User } from "src/app/models/user.model";
import { AccountService } from "src/app/services/account/account.service";
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";
import { Router } from "@angular/router";

const rand = (max) => Math.floor(Math.random() * max);
@Component({
  selector: "dmart-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
  animations: [
    trigger("openClose", [
      // ...
      state(
        "open",
        style({
          opacity: 100,
        })
      ),
      state(
        "closed",
        style({
          opacity: 100,
        })
      ),
      transition("open => closed", [animate("1s")]),
      transition("closed => open", [animate("0.5s")]),
    ]),
  ],
})
export class SearchComponent implements OnInit {
  @Input("styles")
  public styles: string[];

  @Output() public searchCssChange: EventEmitter<any> = new EventEmitter();
  @Input("search_id") public id: string;

  matchingUsers: User[];
  isOpen: boolean = false;
  public operator = {
    name: "Chat(22)",
    status: "online",
    avatar: `https://randomuser.me/api/portraits/women/${rand(100)}.jpg`,
  };

  constructor(private accountservice: AccountService, private router: Router) {}

  ngOnInit() {}

  /**
   * onSearchFriend
   */
  public onSearchFriend(username: string) {
    this.onChange();
    if (username !== "") {
      this.accountservice.getSearchUsersList(username).subscribe((data) => {
        this.matchingUsers = data;
      });
    } else {
      this.matchingUsers = [];
    }
  }

  /**
   * onChange
   */
  onChange() {
    console.log("OnChange Event called!");
    let input = document.getElementById("inpt_search") as HTMLInputElement;
    let searchIcon = document.getElementById("search-icon") as HTMLLabelElement;
    if (input.value != "") {
      this.onMouseEnter();
    } else {
      this.onMouseLeave();
    }
  }

  /**
   * onMouseEnter
   */
  onMouseEnter() {
    console.log("onMouseEnter Event called!");
    this.isOpen = true;
    let searchIcon = document.getElementById("search-icon") as HTMLLabelElement;
    searchIcon.classList.remove("search-change-inactive");
    searchIcon.classList.add("search-change-active");

    let input = document.getElementById("inpt_search") as HTMLInputElement;
    input.style.visibility = "visible";
    input.disabled = false;
    input.placeholder = "Search";
  }

  /**
   * onMouseLeave
   */
  onMouseLeave() {
    console.log("onMouseLeave Event called!");
    this.isOpen = false;

    let searchIcon = document.getElementById("search-icon") as HTMLLabelElement;
    let input = document.getElementById("inpt_search") as HTMLInputElement;

    //Check either the input field is active or not
    if (input.value === undefined || input.value === "") {
      this.matchingUsers = [];
      input.style.visibility = "hidden";

      input.disabled = true;

      searchIcon.classList.remove("search-change-active");
      searchIcon.classList.add("search-change-inactive");

      input.placeholder = "";
      input.value = "";
    }
  }
}
