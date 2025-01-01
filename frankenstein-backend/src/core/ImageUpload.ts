import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import { extname, join } from "path";
import * as fs from "fs/promises";

@Injectable()
export class ImageUpload {
  public async contactImage(file: Express.Multer.File): Promise<string> {
    const uploadDir = "./uploads/contact/contact_image"; // Diretório base para upload
    const uniqueFilename = `${uuidv4()}${extname(file.originalname)}`;
    const uploadPath = `${uploadDir}/${uniqueFilename}`;

    try {
      // Verificar se o diretório existe, caso contrário, criar
      try {
        await fs.access(uploadDir);
      } catch {
        await fs.mkdir(uploadDir, { recursive: true }); // Cria o diretório, incluindo subdiretórios
      }

      // Salvar o arquivo no diretório
      await fs.writeFile(uploadPath, file.buffer);

      // Gerar o caminho relativo para uso no banco de dados
      const relativePath = join("uploads", "contact", "contact_image", uniqueFilename);

      return relativePath;
    } catch (error) {
      // Captura qualquer erro e lança uma exceção apropriada
      throw new InternalServerErrorException("Failed to upload image", error.message);
    }
  }
}
