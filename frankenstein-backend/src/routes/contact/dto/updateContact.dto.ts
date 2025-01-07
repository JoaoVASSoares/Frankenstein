import { PartialType } from "@nestjs/swagger";
import { CreateContactDto } from "./createContact.dto";

export class UpdateContactDto extends PartialType(CreateContactDto) {}
