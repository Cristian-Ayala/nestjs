import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MensajesController } from './mensajes/mensajes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MensajesService } from './mensajes/mensajes.service';
import { Mensaje } from './mensajes/entities/mensaje.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'cristian',
      password: 'cristian',
      database: 'sendmeapp_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Mensaje]),
  ],
  controllers: [AppController, MensajesController],
  providers: [AppService, MensajesService],
})
export class AppModule {}
