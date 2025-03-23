import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { IUserToken } from "src/routes/authentication/Interface/token.interface";
import { EncryptionService } from "src/utils/encryptionCookies.service";
import { Request } from "express";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService, private readonly encryptionService: EncryptionService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          if (!req.cookies?.auth) return null;
          return encryptionService.decryptData(req.cookies.auth);
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get("JWT_SECRET"),
    });
  }

  async validate(payload: IUserToken) {
    if (!payload) {
      throw new UnauthorizedException("Payload Invalid");
    }
    return payload;
  }
}
