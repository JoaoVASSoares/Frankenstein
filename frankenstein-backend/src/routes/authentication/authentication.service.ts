import { HttpStatus, Injectable } from "@nestjs/common";
import { UserService } from "../users/user.service";
import { JwtService } from "@nestjs/jwt";
import { ItokenInformation, IUserToken } from "./Interface/token.interface";
import { UserLoginDto } from "./dtos/userLogin.dto";
import { EncryptionService } from "src/utils/encryptionCookies.service";
import { Response } from "express";

@Injectable()
export class AuthenticationService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService, private readonly encryptionService: EncryptionService) {}

  public async login(userLogin: UserLoginDto, res: Response): Promise<void> {
    const userWithOutPassword = await this.userService.validateUser(userLogin);

    const tokenReponse = await this.jwtService.signAsync({
      id: String(userWithOutPassword.id),
      email: userWithOutPassword.email,
      isAdmin: userWithOutPassword.isAdmin,
    } as IUserToken);

    const encryptedToken = this.encryptionService.encryptData(tokenReponse);

    res.cookie("auth", encryptedToken, {
      httpOnly: true, // Protege contra XSS
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
      // maxAge: 30000, // 30s
    });

    res.status(HttpStatus.OK).send({
      id: String(userWithOutPassword.id),
      name: userWithOutPassword.name,
      email: userWithOutPassword.email,
      isAdmin: userWithOutPassword.isAdmin,
      token: encryptedToken,
    } as ItokenInformation);
  }

  public async logout(res: Response): Promise<void> {
    res.clearCookie("auth");
    res.status(HttpStatus.OK).send({ message: "Logged out successfully" });
  }
}
