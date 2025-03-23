import { BadRequestException, Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import { extname, join } from "path";
import * as fs from "fs/promises";

@Injectable()
export class ImageUpload {
  private readonly allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];

  /**
   * Faz o upload da imagem de perfil do usuário ou do contato.
   * @param file Arquivo enviado via multer.
   * @param type Tipo de upload ("user" para usuários, "contact" para contatos).
   * @returns Caminho relativo da imagem salva.
   */
  public async uploadImage(file: Express.Multer.File, type: "user" | "contact"): Promise<string> {
    // Verificar se o arquivo é uma imagem
    if (!this.allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException("Invalid file type. Only image files are allowed.");
    }

    const uploadDir = `./uploads/${type}/${type == "user" ? "profile_image" : "contact_image"}`; // Diretório base para upload

    // Verificar se o diretório existe, caso contrário, criar
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true }); // Cria o diretório, incluindo subdiretórios
    }

    const uniqueFilename = `${uuidv4()}${extname(file.originalname)}`;
    const uploadPath = `${uploadDir}/${uniqueFilename}`;

    try {
      // Salvar o arquivo no diretório
      await fs.writeFile(uploadPath, file.buffer);

      // Gerar o caminho relativo para uso no banco de dados
      const relativePath = join("uploads", type, `${type == "user" ? "profile_image" : "contact_image"}`, uniqueFilename);

      return relativePath;
    } catch (error) {
      // Captura qualquer erro e lança uma exceção apropriada
      throw new BadRequestException("Failed to upload image");
    }
  }
}
