import { InjectRepository } from "@nestjs/typeorm";
import { Contact } from "./entity/contact.entity";
import { Repository } from "typeorm";
import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateContactDto } from "./dto/createContact.dto";
import { ImageUpload } from "../../core/ImageUpload";

@Injectable()
export class ContactService {
  constructor(
    // Injetando o repositorio (Entity)
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
    private readonly imageUpload: ImageUpload,
  ) {}

  public async create(contact: CreateContactDto, contactProfileImage: Express.Multer.File): Promise<Contact | string> {
    try {
      if (contact.birthday) {
        const birthdayFormat = /^\d{4}-\d{2}-\d{2}$/;

        if (!birthdayFormat.test(contact.birthday)) {
          throw new BadRequestException("The format of birthday data must be yyyy-mm-dd.");
        }
      }

      if (contactProfileImage) {
        contact.contactImage = await this.imageUpload.contactImage(contactProfileImage);
      }

      const contactToSaved = {
        name: contact.name.trim(),
        lastname: contact.lastName.trim(),
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

      const newContact = this.contactRepository.create(contactToSaved);
      const contactSave = this.contactRepository.save(newContact);

      return contactSave;
    } catch (error) {
      throw new BadRequestException(error, "Failed to create a new contact!");
    }
  }
}
