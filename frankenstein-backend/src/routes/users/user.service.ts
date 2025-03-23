import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { ImageUpload } from "src/core/ImageUpload";
import { User } from "./entity/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "./dto/createUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import * as bcrypt from "bcrypt";
import { UserLoginDto } from "../authentication/dtos/userLogin.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly imageUpload: ImageUpload,
  ) {}

  public async create(userData: CreateUserDto, userProfileImage: Express.Multer.File): Promise<User | string> {
    if (userProfileImage) {
      userData.userImage = await this.imageUpload.uploadImage(userProfileImage, "user");
    }

    userData.password = await this.hashPassword(userData.password);

    try {
      const userSave = this.userRepository.save(userData);

      return userSave;
    } catch (e) {
      throw new BadRequestException("Failed to create a new user!");
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  public async findAll(): Promise<User[] | string> {
    const users = this.userRepository.find();

    return users;
  }

  public async findById(id: number): Promise<User> {
    const user = this.userRepository.findOneBy({ id: id });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  public async update(id: number, userData: UpdateUserDto, userProfileImage: Express.Multer.File): Promise<User | string> {
    const existingUser = await this.findById(id);

    if (userData.password) {
      userData.password = await this.hashPassword(userData.password);
    }

    if (userProfileImage) {
      userData.userImage = await this.imageUpload.uploadImage(userProfileImage, "user");
    }

    const updatedUser = {
      ...existingUser,
      ...userData,
    };

    updatedUser.updatedAt = new Date();

    try {
      const saveUser = await this.userRepository.save(updatedUser);

      return saveUser;
    } catch (error) {
      throw new BadRequestException("Failed to updated a user!");
    }
  }

  public async delete(id: number): Promise<void> {
    await this.findById(id);

    await this.userRepository.softDelete(id);
  }

  public async validateUser(userLogin: UserLoginDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ email: userLogin.email });
    if (!user) throw new UnauthorizedException("Invalid credentials");

    const isPasswordValid = await bcrypt.compare(userLogin.password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException("Invalid credentials");

    user.password = "";

    return user;
  }
}
