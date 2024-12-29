import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ContactModule } from "./routes/contact/contact.module";

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
      autoLoadEntities: true,
      synchronize: true,
    }),
    ContactModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
