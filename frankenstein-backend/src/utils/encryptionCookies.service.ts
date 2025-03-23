import * as CryptoJS from "crypto-js";
import { Injectable } from "@nestjs/common";

@Injectable()
export class EncryptionService {
  private secretKey = process.env.COOKIE_SECRET;

  encryptData(data: string): string {
    return CryptoJS.AES.encrypt(data, this.secretKey).toString();
  }

  decryptData(encryptedData: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedData, this.secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
