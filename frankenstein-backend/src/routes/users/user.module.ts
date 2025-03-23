import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { ImageUpload } from "src/core/ImageUpload";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, ImageUpload],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {}
