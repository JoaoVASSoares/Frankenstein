import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { Logger, ValidationPipe } from "@nestjs/common";
import { AllExceptionsFilter } from "./filters/http-exception.filter";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const logger = new Logger("Main");

  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Converte os valores recebidos para os tipos especificados no DTO
      whitelist: true, // Remove propriedades não declaradas no DTO
      forbidNonWhitelisted: false, // Não retorna erro para propriedades extras
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());

  app.enableCors({
    origin: "http://localhost:5173",
    credentials: true,
  });
  const config = new DocumentBuilder()
    .setTitle("Frankenstein")
    .setDescription(
      "The Frankenstein project is a project where I will gather ideas that I find interesting and incorporate them into it. In short, it is a project made up of various different parts without a final endpoint.",
    )
    .setVersion("1.0")
    .addCookieAuth("auth")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/swagger", app, document, {
    jsonDocumentUrl: "api/swagger/json",
  });

  await app.listen(process.env.SERVERPORT);
  logger.log(`Microservices is listening on port ${process.env.SERVERPORT}`);
}
bootstrap();
