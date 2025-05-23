import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ContactModule } from "./routes/contact/contact.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { UserModule } from "./routes/users/user.module";
import { AuthenticationModule } from "./routes/authentication/authentication.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DEVELOPMENT_DB_HOST,
      port: Number(process.env.DEVELOPMENT_DB_PORT),
      username: process.env.DEVELOPMENT_DB_USERNAME,
      password: process.env.DEVELOPMENT_DB_PASSWORD,
      database: process.env.DEVELOPMENT_DB_DATABASE,
      entities: [`${__dirname}/**/*.entity{.js,.ts}`], // Declaração das entidades
      migrations: [`${__dirname}/database/migrations/**/*{.ts,.js}`],
      migrationsRun: true,
      // autoLoadEntities: true,
      // synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "uploads"), // Diretório base para arquivos estáticos
      serveRoot: "/uploads", // Caminho público para acessar os arquivos
    }),
    AuthenticationModule,
    UserModule,
    ContactModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
