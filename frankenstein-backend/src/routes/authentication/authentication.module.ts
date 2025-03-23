import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UserModule } from "../users/user.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { AuthenticationService } from "./authentication.service";
import { AuthenticationController } from "./authentication.controller";
import { JwtStrategy } from "src/pipes/jwt.strategy";
import { EncryptionService } from "src/utils/encryptionCookies.service";

@Module({
  imports: [
    ConfigModule,
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: {
          expiresIn: configService.get<string>("JWT_EXPIRES_IN"),
        },
      }),
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtStrategy, EncryptionService],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
