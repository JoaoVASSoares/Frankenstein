import { Test, TestingModule } from "@nestjs/testing";
import { ContactController } from "../contact.controller";
import { ContactService } from "../contact.service";
import { CreateContactDto } from "../dto/createContact.dto";
import { Contact } from "../entity/contact.entity";

describe("ContactController", () => {
  let contactController: ContactController;
  let contactService: ContactService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactController],
      providers: [
        {
          provide: ContactService,
          useValue: {
            create: jest.fn().mockResolvedValue({
              birthday: "1999-12-19",
              id: 1,
              name: "John",
              lastName: "Doe",
              email: "johndoe@example.com",
              contactImage: "http://example.com/image.jpg",
              phone: "12345678910",
              whatsapp: "12345678910",
              zipCode: "12345678",
              publicPlace: "publicPlace",
              neighborhood: "neighborhood",
              city: "city",
              state: "state",
              number: "number",
              complement: null,
              createdAt: "2024-12-29T22:11:18.029Z",
              updatedAt: null,
              deletedAt: null,
            }),
            getAll: jest.fn().mockRejectedValue([
              {
                id: 1,
                user_id: null,
                name: "John",
                last_name: "Doe",
                birthday: new Date("1990-01-01"),
                email: "johndoe@example.com",
                phone: "123456789",
                whatsapp: "123456789",
                zip_code: "12345678",
                public_place: "123 Main St",
                neighborhood: "Downtown",
                city: "City",
                state: "State",
                number: "10",
                complement: "",
                contact_image: "http://example.com/image.jpg",
                created_at: new Date(),
                updated_at: null,
                deleted_at: null,
              },
            ]),
          },
        },
      ],
    }).compile();

    contactController = module.get<ContactController>(ContactController);
    contactService = module.get<ContactService>(ContactService);
  });

  it("Deve ser definido, definindo o controller", () => {
    expect(contactController).toBeDefined();
  });

  it("Deve chamar ContactService.create e com os parametros corretos e retornar o contato criado", async () => {
    const mockContactDto: CreateContactDto = {
      name: "John",
      lastName: "Doe",
      birthday: "1999-12-19",
      email: "johndoe@example.com",
      phone: "12345678910",
      whatsapp: "12345678910",
      zipCode: "12345678",
      publicPlace: "publicPlace",
      neighborhood: "neighborhood",
      city: "city",
      state: "state",
      number: "number",
    };

    const mockFile: Express.Multer.File = {
      fieldname: "contactImage",
      originalname: "test.jpg",
      encoding: "7bit",
      mimetype: "image/jpeg",
      buffer: Buffer.from("mock-file"),
      size: 1024,
      destination: "",
      filename: "test.jpg",
      path: "",
      stream: null,
    };

    const result = await contactController.create(mockContactDto, mockFile);

    expect(contactService.create).toHaveBeenCalledWith(mockContactDto, mockFile);
    expect(result).toEqual({
      birthday: "1999-12-19",
      id: 1,
      name: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      contactImage: "http://example.com/image.jpg",
      phone: "12345678910",
      whatsapp: "12345678910",
      zipCode: "12345678",
      publicPlace: "publicPlace",
      neighborhood: "neighborhood",
      city: "city",
      state: "state",
      number: "number",
      complement: null,
      createdAt: "2024-12-29T22:11:18.029Z",
      updatedAt: null,
      deletedAt: null,
    });
  });

  it("Deve retornar uma lista de contatos", async () => {
    const mockContacts: Contact[] = [
      {
        id: 1,
        user_id: null,
        name: "John",
        last_name: "Doe",
        birthday: new Date("1990-01-01"),
        email: "johndoe@example.com",
        phone: "123456789",
        whatsapp: "123456789",
        zip_code: "12345678",
        public_place: "123 Main St",
        neighborhood: "Downtown",
        city: "City",
        state: "State",
        number: "10",
        complement: "",
        contact_image: "http://example.com/image.jpg",
        created_at: new Date(),
        updated_at: null,
        deleted_at: null,
      },
    ];

    // Mockando o retorno do serviço
    jest.spyOn(contactService, "getAll").mockResolvedValue(mockContacts);

    const result = await contactController.getAll();

    // Verificando se o serviço foi chamado
    expect(contactService.getAll).toHaveBeenCalled();
    // Verificando se o retorno do controller é igual ao mock
    expect(result).toEqual(mockContacts);
  });
});
