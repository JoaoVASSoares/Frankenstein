import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiConsumes, ApiCookieAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateUserDto } from "./dto/createUser.dto";
import { ApiErrorResponseBadRequest, ApiErrorResponseUnauthorized } from "src/core/responses/decorators/ApiResponse.decoratos";
import { User } from "./entity/user.entity";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { AuthGuard } from "@nestjs/passport";

@ApiTags("User")
@Controller("api/v1/user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("userImage")) // Configurando o interceptor para o campo de arquivo
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Create a new user", description: "Create a new user" })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Successfully created a new user",
    type: CreateUserDto,
  })
  @ApiErrorResponseBadRequest(["Failed to create a new user!", "Invalid file type. Only image files are allowed.", "Failed to upload profile image"])
  public async create(@Body() user: CreateUserDto, @UploadedFile() profile_image: Express.Multer.File): Promise<User | string> {
    return this.userService.create(user, profile_image);
  }

  @Get()
  @ApiCookieAuth()
  @UseGuards(AuthGuard("jwt"))
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Get user list", description: "Get user list" })
  @ApiResponse({ status: HttpStatus.OK, description: "Get user list", type: [CreateUserDto] })
  @ApiErrorResponseUnauthorized("Unauthorized")
  public async findAll(): Promise<any> {
    return this.userService.findAll();
  }

  @Get(":id")
  @ApiCookieAuth()
  @UseGuards(AuthGuard("jwt"))
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Find a one user", description: "Find a one user" })
  @ApiResponse({ status: HttpStatus.OK, description: "Find a one user", type: CreateUserDto })
  @ApiErrorResponseUnauthorized("Unauthorized")
  public async findById(@Param("id") id: number): Promise<User | string> {
    return this.userService.findById(id);
  }

  @Put(":id")
  @ApiCookieAuth()
  @UseGuards(AuthGuard("jwt"))
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("userImage"))
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Update a new user", description: "Create a new user" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Successfully update a new user",
    type: UpdateUserDto,
  })
  @ApiErrorResponseUnauthorized("Unauthorized")
  public async update(@Param("id") id: number, @Body() user: UpdateUserDto, @UploadedFile() profile_image: Express.Multer.File): Promise<User | string> {
    return this.userService.update(id, user, profile_image);
  }

  @Delete(":id")
  @ApiCookieAuth()
  @UseGuards(AuthGuard("jwt"))
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Delete a one user", description: "Delete a one user" })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: "Delete a one user" })
  @ApiErrorResponseUnauthorized("Unauthorized")
  public async delete(@Param("id") id: number): Promise<void> {
    return this.userService.delete(id);
  }
}
