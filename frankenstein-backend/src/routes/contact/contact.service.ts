import { InjectRepository } from "@nestjs/typeorm";
import { Contact } from "./entity/contact.entity";
import { Repository } from "typeorm";
import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateContactDto } from "./dto/createContact.dto";
import { ImageUpload } from "../../core/ImageUpload";
import * as dayjs from "dayjs";

@Injectable()
export class ContactService {
  constructor(
    // Injetando o repositorio (Entity)
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
    // Chamando o imageUpload
    private readonly imageUpload: ImageUpload,
  ) {}

  public async create(contact: CreateContactDto, contactProfileImage: Express.Multer.File): Promise<Contact | string> {
    if (contact.birthday && !dayjs(contact.birthday, "YYYY-MM-DD", true).isValid()) {
      throw new BadRequestException("The format of birthday data must be yyyy-mm-dd, and it must be a valid date.");
    }

    if (contactProfileImage) {
      try {
        contact.contactImage = await this.imageUpload.contactImage(contactProfileImage);
      } catch (error) {
        throw new InternalServerErrorException("Failed to upload profile image", error.message);
      }
    }
    try {
      const contactToSaved = {
        name: contact.name.trim(),
        last_name: contact.lastName.trim(),
        birthday: contact.birthday.trim(),
        email: contact.email.trim(),
        contact_image: contact.contactImage,
        phone: contact.phone.trim(),
        whatsapp: contact.whatsapp.trim(),
        zip_code: contact.zipCode.trim(),
        public_place: contact.publicPlace.trim(),
        neighborhood: contact.neighborhood.trim(),
        city: contact.city.trim(),
        state: contact.state.trim(),
        number: contact.number.trim(),
        complement: contact.complement.trim(),
        created_at: new Date(),
        updated_at: null,
        deleted_at: null,
      };

      const contactSave = this.contactRepository.save(contactToSaved);

      return contactSave;
    } catch (error) {
      throw new BadRequestException("Failed to create a new contact!");
    }
  }

  public async getAll(): Promise<Contact[]> {
    const getAllContact = await this.contactRepository.find();

    return getAllContact;
  }
}
