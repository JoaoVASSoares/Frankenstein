import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res, UseGuards } from "@nestjs/common";
import { ApiCookieAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthenticationService } from "./authentication.service";
import { UserLoginDto } from "./dtos/userLogin.dto";
import { TokenDto } from "./dtos/token.dto";
import { ApiErrorResponseUnauthorized } from "src/core/responses/decorators/ApiResponse.decoratos";
import { Response } from "express";
import { AuthGuard } from "@nestjs/passport";
import { CurrentUser } from "src/core/responses/decorators/CurrentUser.decoratos";
import { IUserToken } from "./Interface/token.interface";

@ApiTags("Authentication")
@Controller("api/v1/authentication")
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post("login")
  @ApiOperation({ summary: "Login a user", description: "Login a user" })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "User logged",
    type: TokenDto,
  })
  @ApiErrorResponseUnauthorized("Invalid credentials")
  public async login(@Body() userlogin: UserLoginDto, @Res() res: Response): Promise<void> {
    return this.authenticationService.login(userlogin, res);
  }

  @ApiCookieAuth()
  @UseGuards(AuthGuard("jwt"))
  @Post("logout")
  @ApiOperation({ summary: "Logout a user", description: "Logout a user" })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "User loggout",
    type: String,
  })
  @ApiErrorResponseUnauthorized("Unauthorized")
  public async logout(@Res() res: Response): Promise<void> {
    return this.authenticationService.logout(res);
  }

  @Get("verify")
  @ApiCookieAuth()
  @UseGuards(AuthGuard("jwt"))
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Checks if the user is authenticated" })
  @ApiResponse({ status: HttpStatus.OK, description: "Authenticated user", type: Boolean })
  @ApiErrorResponseUnauthorized("Unauthorized")
  public async verify(@CurrentUser() user: IUserToken): Promise<IUserToken> {
    return user;
  }
}
