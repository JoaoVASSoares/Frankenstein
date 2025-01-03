import { Test, TestingModule } from "@nestjs/testing";
import { Repository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";
import { BadRequestException } from "@nestjs/common";
import { ContactService } from "../contact.service";
import { Contact } from "../entity/contact.entity";
import { CreateContactDto } from "../dto/createContact.dto";
import { ImageUpload } from "../../../core/ImageUpload";

describe("ContactService", () => {
  let contactService: ContactService;
  let contactRepository: Repository<Contact>;
  let imageUpload: ImageUpload;

  // Antes de começar, declaro os modulos, repositorios e servições.
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactService,
        {
          provide: getRepositoryToken(Contact),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: ImageUpload,
          useValue: {
            contactImage: jest.fn().mockResolvedValue("http://example.com/image.jpg"),
          },
        },
      ],
    }).compile();

    contactService = module.get<ContactService>(ContactService);
    contactRepository = module.get<Repository<Contact>>(getRepositoryToken(Contact));
    imageUpload = module.get<ImageUpload>(ImageUpload);
  });

  it("Definição do service.", () => {
    expect(contactService).toBeDefined();
  });

  it("Criação de um novo contato com sucesso.", async () => {
    // Mock do contato (Contato fake)
    const mockContactDto: CreateContactDto = {
      name: "John",
      lastName: "Doe",
      birthday: "1990-01-01",
      email: "johndoe@example.com",
      phone: "123456789",
      whatsapp: "123456789",
      zipCode: "12345678",
      publicPlace: "123 Main St",
      neighborhood: "Downtown",
      city: "City",
      state: "State",
      number: "10",
      complement: "",
      contactImage: "",
    };

    // Mock da imagem (imagem face)
    const mockFile: Express.Multer.File = {
      fieldname: "contactImage",
      originalname: "test.jpg",
      encoding: "7bit",
      mimetype: "image/jpeg",
      buffer: Buffer.from("mock file"),
      size: 1024,
      destination: "",
      filename: "test.jpg",
      path: "",
      stream: null,
    };

    // "Espiona a função save do repositorio e verifica se o retorno esta correto"
    jest.spyOn(contactRepository, "save").mockResolvedValue({
      id: 1,
      ...mockContactDto,
    } as any);

    const result = await contactService.create(mockContactDto, mockFile);

    // Espera a chamada da função.
    expect(imageUpload.contactImage).toHaveBeenCalledWith(mockFile);
    expect(contactRepository.save).toHaveBeenCalledWith(expect.any(Object));
    expect(result).toEqual(expect.objectContaining({ id: 1, name: "John" }));
  });

  it("Lançamento de erro caso tenha problema para subir a imagem", async () => {
    const mockContactDto: CreateContactDto = {
      name: "John",
      lastName: "Doe",
      birthday: "1990-01-01",
      email: "johndoe@example.com",
      phone: "123456789",
      whatsapp: "123456789",
      zipCode: "12345678",
      publicPlace: "123 Main St",
      neighborhood: "Downtown",
      city: "City",
      state: "State",
      number: "10",
      complement: "",
      contactImage: "",
    };

    const mockFile: Express.Multer.File = {
      fieldname: "contactImage",
      originalname: "test.jpg",
      encoding: "7bit",
      mimetype: "image/jpeg",
      buffer: Buffer.from("mock file"),
      size: 1024,
      destination: "",
      filename: "test.jpg",
      path: "",
      stream: null,
    };

    // Simular falha no ImageUpload, a função spyOn serve para monitorar a chama da função imageUpload e assim verificar se for chamada corretamente.
    jest.spyOn(imageUpload, "contactImage").mockRejectedValue(new BadRequestException("Failed to upload image"));

    // Erro ao criar novo contado.
    await expect(contactService.create(mockContactDto, mockFile)).rejects.toThrow(new BadRequestException("Failed to upload profile image"));
  });
});
