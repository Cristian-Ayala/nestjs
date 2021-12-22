import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMensajeDto } from './dto/create-mensaje-dto';
import { Mensaje } from './entities/mensaje.entity';

@Injectable()
export class MensajesService {
  constructor(
    @InjectRepository(Mensaje)
    private mensajeRepository: Repository<Mensaje>,
  ) {}

  async getAll(): Promise<Mensaje[]> {
    return await this.mensajeRepository.find();
  }

  async createMensaje(mensajeNuevo: CreateMensajeDto): Promise<Mensaje> {
    const mensaje = new Mensaje();
    mensaje.nick = mensajeNuevo.nick;
    mensaje.mensaje = mensajeNuevo.mensaje;
    return await this.mensajeRepository.save(mensaje);
  }

  async updateMensaje(idMensaje: number, mensajeActualizar: CreateMensajeDto): Promise<Mensaje> {
    const mensaje = await this.mensajeRepository.findOne(idMensaje);
    mensaje.nick = mensajeActualizar.nick;
    mensaje.mensaje = mensajeActualizar.mensaje;
    return await this.mensajeRepository.save(mensaje);
  }

  async deleteMensaje(idMensaje: number):Promise<any> {
    return await this.mensajeRepository.delete(idMensaje);
  }
}
