import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DmartCryptoService {
  constructor() {}

  private chat_scrt_key: string = "chat";
  private utf8_encoding: string = "utf8";

  encode(plaintext: string): string {
    var buffer = new Buffer(plaintext);
    let base64data = buffer.toString("base64") + this.chat_scrt_key;
    return base64data;
  }

  decode(cypher: string): string {
    let buffer = Buffer.from(cypher.replace(this.chat_scrt_key, ""), "base64");
    let plaintext = buffer.toString(this.utf8_encoding);
    return plaintext;
  }
}
