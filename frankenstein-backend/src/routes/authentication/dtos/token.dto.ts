import { ApiProperty } from "@nestjs/swagger";

export class TokenDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  isAdmin: boolean;
}
