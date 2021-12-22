import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CreateMensajeDto } from './dto/create-mensaje-dto';
import { MensajesService } from './mensajes.service';

@Controller('mensajes')
export class MensajesController {

    constructor(private mensajeServices: MensajesService){

    }

    @Post()
    async create(@Body() createMensajeDto: CreateMensajeDto, @Res() response) {
        return await this.mensajeServices.createMensaje(createMensajeDto).then(mensaje=>{
            response.status(HttpStatus.CREATED).json(mensaje);
        }).catch(()=> {
            response.status(HttpStatus.FORBIDDEN).json({error: " error en la creación del mensaje"});
        });
    }

    @Get()
    getAll(@Res() response) {
        return this.mensajeServices.getAll().then(mensajeList=>{
            response.status(HttpStatus.OK).json(mensajeList);
        }).catch(()=> {
            response.status(HttpStatus.FORBIDDEN).json({error: " error en la obtención de mensajes"});
        });
    }

    @Put(':id')
    update(@Body() updateMensajeDto: CreateMensajeDto,@Res() response, @Param('id') idMensaje) {
        return this.mensajeServices.updateMensaje(idMensaje, updateMensajeDto).then(mensaje =>{
            response.status(HttpStatus.OK).json(mensaje)
        }).catch(()=>{
            response.status(HttpStatus.FORBIDDEN).json({error: " error en la actualización de mensajes"});
        });
    }

    @Delete(':id')
    delete(@Res() response, @Param('id') idMensaje) {
        return this.mensajeServices.deleteMensaje(idMensaje).then(mensaje =>{
            response.status(HttpStatus.OK).json(mensaje)
        }).catch(()=>{
            response.status(HttpStatus.FORBIDDEN).json({error: " error en la eliminación de mensajes"});
        });
    }
}
