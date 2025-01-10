import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class DefaultPaginationQueryDto {
  @ApiProperty({ description: "Number of items on a page", default: 5, readOnly: true })
  @IsNotEmpty()
  @IsInt()
  @Max(5)
  @Type(() => Number)
  limit: number;

  @ApiProperty({ description: "Page number" })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  @IsOptional()
  page: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;

  // @ApiPropertyOptional({
  //   description: "Sorting direction ('ASC' or 'DESC')",
  //   enum: ["ASC", "DESC"],
  //   required: false,
  // })
  // @IsIn(["ASC", "DESC"])
  // order: "ASC" | "DESC";
}
