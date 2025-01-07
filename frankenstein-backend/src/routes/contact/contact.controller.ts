import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiConsumes, ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ContactService } from "./contact.service";
import { CreateContactDto } from "./dto/createContact.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { Contact } from "./entity/contact.entity";
import { DefaultPaginationQueryDto } from "src/core/DefaultPaginationQuery";
import { Pagination } from "nestjs-typeorm-paginate";
import { UpdateContactDto } from "./dto/updateContact.dto";

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

  @Get()
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Get contact list", description: "Get contact list" })
  @ApiResponse({ status: HttpStatus.OK, description: "Get contact list", type: [CreateContactDto] })
  public async getAll(@Query() query: DefaultPaginationQueryDto): Promise<Pagination<Contact>> {
    return this.contactService.getAll(query);
  }

  @Get(":id")
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Find a one contact", description: "Find a one contact" })
  @ApiResponse({ status: HttpStatus.OK, description: "Find a one contact", type: CreateContactDto })
  public async findById(@Param("id") id: number): Promise<Contact | string> {
    return this.contactService.findById(id);
  }

  @Put(":id")
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("contactImage")) // Configurando o interceptor para o campo de arquivo
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Update a new contact", description: "Create a new contact" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Successfully update a new contact",
    type: UpdateContactDto,
  })
  public async update(@Param("id") id: number, @Body() contact: UpdateContactDto, @UploadedFile() profile_image: Express.Multer.File): Promise<Contact | string> {
    return this.contactService.update(id, contact, profile_image);
  }

  @Delete(":id")
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Delete a one contact", description: "Delete a one contact" })
  @ApiResponse({ status: HttpStatus.OK, description: "Delete a one contact" })
  public async delete(@Param("id") id: number): Promise<null | string> {
    return this.contactService.delete(id);
  }
}
