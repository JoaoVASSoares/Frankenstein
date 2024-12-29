import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Contact } from "./entity/contact.entity";
import { ContactController } from "./contact.controller";
import { ContactService } from "./contact.service";
import { ImageUpload } from "../../core/ImageUpload";

@Module({
  imports: [TypeOrmModule.forFeature([Contact])],
  controllers: [ContactController],
  providers: [ContactService, ImageUpload],
})
export class ContactModule {}
