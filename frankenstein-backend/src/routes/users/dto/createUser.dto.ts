import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ description: "User first name", format: "string", type: "string" })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  name: string;

  @ApiPropertyOptional({ description: "User profile photo", type: "string", format: "binary" })
  @IsOptional()
  userImage?: string;

  @ApiProperty({ description: "User email" })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  email: string;

  @ApiProperty({ description: "User password" })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  password: string;

  @ApiPropertyOptional({ description: "User Admin ", default: false })
  @IsBoolean()
  @IsOptional()
  isAdmin?: boolean;

  @ApiPropertyOptional({ description: "Created_at user" })
  createdAt?: Date;

  @ApiPropertyOptional({ description: "Updated_at user" })
  updatedAt?: Date;

  @ApiPropertyOptional({ description: "Deleted_at user" })
  deletedAt?: Date;
}
