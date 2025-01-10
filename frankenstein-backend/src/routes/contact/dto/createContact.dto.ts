import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateContactDto {
  @ApiProperty({ description: "Contact first name", format: "string", type: "string" })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  name: string;

  @ApiProperty({ description: "Contact Last Name", format: "string", type: "string" })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  lastName: string;

  @ApiProperty({ description: "Contact's birthday date in the format YYYY-MM-DD", format: "Date", type: "string" })
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: "The format of birthday data must be yyyy-mm-dd." })
  @IsNotEmpty()
  @IsDateString({}, { message: "The birthday must be a valid date." })
  @Transform(({ value }) => value?.trim())
  birthday: string;

  @ApiPropertyOptional({ description: "Contact profile photo", type: "string", format: "binary" })
  @IsOptional()
  contactImage?: string;

  @ApiProperty({ description: "Contact email" })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  email: string;

  @ApiPropertyOptional({ description: "Contact phone number on min length 10 number or max length 11 number" })
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  phone?: string;

  @ApiPropertyOptional({ description: "Contact whatsapp number on min length 10 number or max length 11 number" })
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  whatsapp?: string;

  @ApiProperty({ description: "Contact zip codee on min or max length 8 number" })
  @MaxLength(8)
  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  zipCode: string;

  @ApiProperty({ description: "Contact public place" })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  publicPlace: string;

  @ApiProperty({ description: "Contact neighborhood" })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  neighborhood: string;

  @ApiProperty({ description: "Contact city" })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  city: string;

  @ApiProperty({ description: "Contact state" })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  state: string;

  @ApiProperty({ description: "Contact house number" })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  number: string;

  @ApiPropertyOptional({ description: "Contact house complment" })
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  complement?: string;

  @ApiPropertyOptional({ description: "CreatedAt contact" })
  createdAt?: Date;

  @ApiPropertyOptional({ description: "UpdatedAt contact" })
  updatedAt?: Date;

  @ApiPropertyOptional({ description: "DeletedAt contact" })
  deletedAt?: Date;
}
