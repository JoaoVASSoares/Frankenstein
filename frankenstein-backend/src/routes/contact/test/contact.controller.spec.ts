import { Test, TestingModule } from "@nestjs/testing";
import { ContactController } from "../contact.controller";
import { ContactService } from "../contact.service";
import { CreateContactDto } from "../dto/createContact.dto";

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
});
