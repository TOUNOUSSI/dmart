import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root",
})
export class GmartCookieService {
  constructor(private cookieService: CookieService) {}

  /**
   * Get chat cookies
   */
  getChatCookies(): string[] {
    let cookies = this.cookieService.getAll();
    let cookiesArray = Object.keys(cookies).map((key) => String(key));
    let chatCookies: string[] = cookiesArray.filter((_key) => {
      return _key.includes("chat");
    });
    return chatCookies;
  }
}
