import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiBearerAuth, ApiConsumes, ApiCookieAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ContactService } from "./contact.service";
import { CreateContactDto } from "./dto/createContact.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { Contact } from "./entity/contact.entity";
import { DefaultPaginationQueryDto } from "src/core/DefaultPaginationQuery";
import { Pagination } from "nestjs-typeorm-paginate";
import { UpdateContactDto } from "./dto/updateContact.dto";
import { ApiErrorResponseBadRequest, ApiErrorResponseUnauthorized } from "src/core/responses/decorators/ApiResponse.decoratos";
import { AuthGuard } from "@nestjs/passport";

@ApiCookieAuth()
@ApiTags("Contact")
@Controller("api/v1/contact")
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @UseGuards(AuthGuard("jwt"))
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
  @ApiErrorResponseBadRequest([
    "The format of birthday data must be yyyy-mm-dd, and it must be a valid date.",
    "Failed to create a new contact!",
    "Invalid file type. Only image files are allowed.",
    "Failed to upload profile image",
  ])
  @ApiErrorResponseUnauthorized("Unauthorized")
  public async create(@Body() contact: CreateContactDto, @UploadedFile() profile_image: Express.Multer.File): Promise<Contact | string> {
    return this.contactService.create(contact, profile_image);
  }

  @Get()
  @UseGuards(AuthGuard("jwt"))
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Get contact list", description: "Get contact list" })
  @ApiResponse({ status: HttpStatus.OK, description: "Get contact list", type: [CreateContactDto] })
  @ApiErrorResponseUnauthorized("Unauthorized")
  public async findAll(@Query() query: DefaultPaginationQueryDto): Promise<Pagination<Contact>> {
    return this.contactService.findAll(query);
  }

  @Get(":id")
  @UseGuards(AuthGuard("jwt"))
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Find a one contact", description: "Find a one contact" })
  @ApiResponse({ status: HttpStatus.OK, description: "Find a one contact", type: CreateContactDto })
  @ApiErrorResponseUnauthorized("Unauthorized")
  public async findById(@Param("id") id: number): Promise<Contact | string> {
    return this.contactService.findById(id);
  }

  @Put(":id")
  @UseGuards(AuthGuard("jwt"))
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
  @ApiErrorResponseUnauthorized("Unauthorized")
  public async update(@Param("id") id: number, @Body() contact: UpdateContactDto, @UploadedFile() profile_image: Express.Multer.File): Promise<Contact | string> {
    return this.contactService.update(id, contact, profile_image);
  }

  @Delete(":id")
  @UseGuards(AuthGuard("jwt"))
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Delete a one contact", description: "Delete a one contact" })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: "Delete a one contact" })
  @ApiErrorResponseUnauthorized("Unauthorized")
  public async delete(@Param("id") id: number): Promise<void> {
    return this.contactService.delete(id);
  }
}
