import { InjectRepository } from "@nestjs/typeorm";
import { Contact } from "./entity/contact.entity";
import { Repository } from "typeorm";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateContactDto } from "./dto/createContact.dto";
import { ImageUpload } from "../../core/ImageUpload";
import * as dayjs from "dayjs";
import { DefaultPaginationQueryDto } from "src/core/DefaultPaginationQuery";
import { paginate, Pagination } from "nestjs-typeorm-paginate";
import { UpdateContactDto } from "./dto/updateContact.dto";

@Injectable()
export class ContactService {
  constructor(
    // Injetando o repositorio (Entity)
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
    // Chamando o imageUpload
    private readonly imageUpload: ImageUpload,
  ) {}

  public async create(contactData: CreateContactDto, contactProfileImage: Express.Multer.File): Promise<Contact | string> {
    if (contactData.birthday && !dayjs(contactData.birthday, "YYYY-MM-DD", true).isValid()) {
      throw new BadRequestException("The format of birthday data must be yyyy-mm-dd, and it must be a valid date.");
    }

    if (contactProfileImage) {
      contactData.contactImage = await this.imageUpload.contactImage(contactProfileImage);
    }

    try {
      const contactSave = this.contactRepository.save(contactData);

      return contactSave;
    } catch (error) {
      throw new BadRequestException("Failed to create a new contact!");
    }
  }

  public async getAll(query: DefaultPaginationQueryDto): Promise<Pagination<Contact>> {
    const queryBuilder = this.contactRepository.createQueryBuilder("contact");

    // Adicionar cláusula WHERE para LIKE se "search" for fornecido
    if (query.search) {
      queryBuilder.where(
        "contact.name ILIKE :search OR contact.email ILIKE :search", // Busca no nome ou email
        { search: `%${query.search}%` }, // Busca parcial
      );
    }

    queryBuilder.orderBy("contact.id", "DESC");

    return paginate<Contact>(queryBuilder, query);
  }

  public async findById(id: number): Promise<Contact> {
    const contact = await this.contactRepository.findOneBy({ id: id });

    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }

    return contact;
  }

  // Criar as funções
  public async update(id: number, contactData: UpdateContactDto, contactProfileImage: Express.Multer.File): Promise<Contact | string | any> {
    // Verifica se o contato existe antes de prosseguir
    const existingContact = await this.findById(id);

    if (contactData.birthday && !dayjs(contactData.birthday, "YYYY-MM-DD", true).isValid()) {
      throw new BadRequestException("The format of birthday data must be yyyy-mm-dd, and it must be a valid date.");
    }

    if (contactProfileImage) {
      contactData.contactImage = await this.imageUpload.contactImage(contactProfileImage);
    }

    // Atualiza os campos no objeto existente
    const updatedContact = {
      ...existingContact,
      ...contactData, // Sobrescreve os valores do contato existente com os novos dados
    };

    try {
      return await this.contactRepository.save(updatedContact);
    } catch (error) {
      console.log(error);
      throw new BadRequestException("Failed to updated a contact!");
    }
  }

  public async delete(id: number): Promise<void> {
    await this.findById(id);

    await this.contactRepository.softDelete(id);
  }
}
