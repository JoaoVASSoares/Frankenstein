import { Body, Controller, HttpCode, HttpStatus, Post, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiConsumes, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ContactService } from "./contact.service";
import { CreateContactDto } from "./dto/createContact.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { Contact } from "./entity/contact.entity";

@ApiTags("Contact")
@Controller("api/v1/contact")
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("contactImage")) // Configurando o interceptor para o campo de arquivo
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Create a new contact", description: "Create a new contact" })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Successfully created a new contact",
    type: CreateContactDto,
  })
  public async create(@Body() contact: CreateContactDto, @UploadedFile() profile_image: Express.Multer.File): Promise<Contact | string> {
    return this.contactService.create(contact, profile_image);
  }
}
