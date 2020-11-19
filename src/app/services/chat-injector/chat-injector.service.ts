import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { ChatWidgetComponent } from "src/app/views/chat";
import { DmartCryptoService } from "../dmart-cryptography/dmart-crypto.service";
import { GmartCookieService } from "../gmart-cookie/gmart-cookie.service";

@Injectable({
  providedIn: "root",
})
export class ChatInjectorService {
  _id: string = "";

  constructor(
    private cookieService: CookieService,
    private cryptoService: DmartCryptoService,
    private gmartCookieService: GmartCookieService
  ) {}

  /**
   * Check either the chatWidget unique ID (cookie), is available
   * and check if the DOM already containing a chat widget with the same ID
   * @param profile
   * @param chatWidget
   */
  canInjectChat(profile: any): Boolean {
    this._id = "";
    let chatCookies = this.gmartCookieService.getChatCookies();

    this._id = this.cryptoService.encode(JSON.stringify(profile));
    let chatWidget = document.getElementById(this._id);
    //The cookie exist
    if (!chatCookies.includes(this._id)) {
      //Cookie doesn't exist so check the existence of the element in DOM
      this.cookieService.set(this._id, this._id);
      //check if the element exists in DOM
      if (chatWidget !== undefined && chatWidget !== null) {
        return false;
      } else {
        //Injection into DOM
        return true;
      }
    } else {
      //check if the element exists in DOM
      if (chatWidget !== undefined && chatWidget !== null) {
        return false;
      } else {
        //Case new Chat Widget is created : Cookie and HtmlElement doesn't exist so new injection
        return true;
      }
    }
  }

  public regenerateID(profile: string): string {
    this._id = this.cryptoService.encode(JSON.stringify(profile));
    return this._id;
  }
}
