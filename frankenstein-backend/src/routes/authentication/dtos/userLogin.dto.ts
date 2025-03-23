import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserLoginDto {
  @ApiProperty({ description: "User login email", required: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: "User password", required: true })
  @IsNotEmpty()
  @IsString()
  password: string;
}
